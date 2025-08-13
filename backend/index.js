// backend/index.js
import express from "express";
import cors from "cors";
import axios from "axios";
import { pipeline } from "@xenova/transformers";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

// -------------------------------
// 1. In-memory cache
// -------------------------------
let cache = {
  data: [],
  timestamp: 0,
  TTL: 10 * 60 * 1000, // 10 minutes
};

// -------------------------------
// 2. Sentiment classifier
// -------------------------------
const classifier = await pipeline(
  "text-classification",
  "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
);

// -------------------------------
// 3. Helper – categorise
// -------------------------------
function categorize({ label, score }) {
  if (label === "POSITIVE" && score > 0.95) return "Good";
  if (label === "NEGATIVE" && score > 0.95) return "Bad";
  return "Neutral";
}

// -------------------------------
// 4. GET /api/news
// -------------------------------
app.get("/api/news", async (req, res) => {
  const now = Date.now();

  // Use cache if still fresh
  if (cache.data.length && now - cache.timestamp < cache.TTL) {
    return res.json(cache.data);
  }

  try {
    // Fetch top 40 headlines
    const newsRes = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = newsRes.data.articles;

    // Run sentiment on each title
    const sentiments = await classifier(articles.map((a) => a.title || ""));

    const enriched = articles.map((article, idx) => ({
      title: article.title || "No title",
      description: article.description || "",
      url: article.url || "#",
      urlToImage: article.urlToImage || "",
      source: article.source?.name || "Unknown",
      sentimentCategory: categorize(sentiments[idx]),
    }));

    // Update cache
    cache = { data: enriched, timestamp: now };

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// -------------------------------
// 5. Start server
// -------------------------------
app.listen(PORT, () =>
  console.log(`✅ Backend listening on http://localhost:${PORT}`)
);