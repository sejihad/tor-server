// server.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url, {
      proxy: {
        host: "127.0.0.1",
        port: process.env.TOR_SOCKS_PORT || 9050,
        protocol: "socks5",
      },
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch URL", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
