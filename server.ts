import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

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
