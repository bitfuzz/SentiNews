// frontend/src/components/Header.js
export default function Header({ setFilter, activeFilter }) {
  const buttons = ["All", "Good", "Bad", "Neutral"];
  return (
    <header>
      <h1>Sentiment Stream</h1>
      <nav>
        {buttons.map((b) => (
          <button
            key={b}
            className={activeFilter === b ? "active" : ""}
            onClick={() => setFilter(b)}
          >
            {b}
          </button>
        ))}
      </nav>
    </header>
  );
}