// frontend/src/App.js
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import NewsCard from "./components/NewsCard";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news")
      .then((res) => setArticles(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All"
      ? articles
      : articles.filter((a) => a.sentimentCategory === filter);

  return (
    <div className="App">
      <Header setFilter={setFilter} activeFilter={filter} />
      {loading && <p className="loading">Loading…</p>}
      <main className="grid">
        {filtered.map((a) => (
          <NewsCard key={a.url} article={a} />
        ))}
      </main>
    </div>
  );
}

export default App;