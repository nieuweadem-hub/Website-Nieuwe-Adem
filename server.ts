import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory + persistent cache for calendar feed (15-min TTL) to protect against Google Calendar rate-limiting (429)
  let cachedCalendarData = "";
  let lastCalendarFetchTime = 0;
  const CACHE_TTL_MS = 15 * 60 * 1000;
  const calendarCachePath = path.join(process.cwd(), "calendar_cache.ics");
  const FALLBACK_CALENDAR = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nieuwe Adem//Agenda//NL
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Nieuwe Adem Agenda
X-WR-TIMEZONE:Europe/Amsterdam
END:VCALENDAR`;

  try {
    if (fs.existsSync(calendarCachePath)) {
      const saved = fs.readFileSync(calendarCachePath, "utf-8");
      if (saved && saved.includes("BEGIN:VCALENDAR")) {
        cachedCalendarData = saved;
        lastCalendarFetchTime = Date.now();
      }
    }
  } catch (initErr) {
    // Ignore cache load error
  }

  // Proxy endpoint for calendar
  app.get("/api/calendar", async (req, res) => {
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    const now = Date.now();

    // 1. Return fresh cached data immediately if within TTL
    if (cachedCalendarData && (now - lastCalendarFetchTime < CACHE_TTL_MS)) {
      res.setHeader("X-Calendar-Cache", "HIT");
      return res.send(cachedCalendarData);
    }

    // 2. Fetch fresh ICS from Google Calendar
    try {
      const icsUrl = 'https://calendar.google.com/calendar/ical/martin.nieuweadem%40gmail.com/public/basic.ics';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(icsUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "text/calendar, text/plain, */*"
        }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        if (text && text.includes("BEGIN:VCALENDAR")) {
          cachedCalendarData = text;
          lastCalendarFetchTime = now;
          try {
            fs.writeFileSync(calendarCachePath, text, "utf-8");
          } catch (writeErr) {
            // Ignore disk cache write errors
          }
          res.setHeader("X-Calendar-Cache", "MISS");
          return res.send(text);
        }
      }

      // If status 429 or any non-200, log as notice and fall back gracefully
      if (response.status === 429) {
        console.info("Google Calendar rate-limited (status 429). Serving cached or fallback agenda.");
      } else {
        console.info(`Google Calendar status ${response.status}. Serving cached or fallback agenda.`);
      }
    } catch (err: any) {
      console.info("Notice fetching Google Calendar:", err?.name === "AbortError" ? "Fetch timeout" : err?.message);
    }

    // Set cooldown timestamp so subsequent hits don't wait on Google timeouts during rate limit
    lastCalendarFetchTime = now;

    // 3. Fallback to stale cached data or valid empty calendar structure
    if (cachedCalendarData) {
      res.setHeader("X-Calendar-Cache", "STALE");
      return res.send(cachedCalendarData);
    }

    cachedCalendarData = FALLBACK_CALENDAR;
    res.setHeader("X-Calendar-Cache", "FALLBACK");
    return res.send(FALLBACK_CALENDAR);
  });

  // Contact form submission endpoint via EmailJS REST API
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body || {};
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Vul alstublieft alle verplichte velden in." });
      }

      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID || 'service_fjxk3t7';
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_sc93w6u';
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || '6DAm-rgSiGI9l5MU-';

      const payload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: String(name).trim(),
          from_name: String(name).trim(),
          user_name: String(name).trim(),
          email: String(email).trim(),
          reply_to: String(email).trim(),
          from_email: String(email).trim(),
          user_email: String(email).trim(),
          phone: phone ? String(phone).trim() : "-",
          telephone: phone ? String(phone).trim() : "-",
          message: String(message).trim(),
          to_email: "martin.nieuweadem@gmail.com",
          to_name: "Martin",
          subject: `Nieuw bericht via website van ${String(name).trim()}`
        }
      };

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": req.headers.origin || "https://nieuweadem.nl",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(payload)
      });

      const responseText = await emailResponse.text();
      if (!emailResponse.ok) {
        console.error("EmailJS API response not ok:", emailResponse.status, responseText);
        return res.status(emailResponse.status).json({
          success: false,
          error: `EmailJS fout (${emailResponse.status}): ${responseText}`
        });
      }

      return res.json({ success: true, message: responseText });
    } catch (err: any) {
      console.error("Error in /api/contact handler:", err);
      return res.status(500).json({ success: false, error: err?.message || "Interne fout bij verzenden" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
