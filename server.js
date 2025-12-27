import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
const requests = [];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Receive song requests
app.post("/api/requests", (req, res) => {
  const { song } = req.body;

  if (!song) {
    return res.status(400).json({ error: "Song is required" });
  }

  const entry = {
    song,
    time: new Date().toISOString()
  };

  requests.push(entry);
  console.log("New request:", entry);

  res.json({ success: true });
});

// View all requests (DJ-only for now)
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("API running on port", PORT);
});
