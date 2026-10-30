import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy endpoint for calendar
  app.get("/api/calendar", async (req, res) => {
    try {
      const icsUrl = 'https://calendar.google.com/calendar/ical/martin.nieuweadem%40gmail.com/public/basic.ics';
      const response = await fetch(icsUrl);
      if (!response.ok) {
        throw new Error(`Google Calendar returned status ${response.status}`);
      }
      const data = await response.text();
      res.setHeader("Content-Type", "text/calendar");
      res.send(data);
    } catch (error) {
      console.error("Error proxying calendar request:", error);
      res.status(500).json({ error: "Failed to fetch calendar data" });
    }
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
