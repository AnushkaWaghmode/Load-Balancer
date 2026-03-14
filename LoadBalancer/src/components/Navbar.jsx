export default function Navbar({ page, onNav }) {
  const pages = [
    { id: "home",      label: "HOME" },
    { id: "dashboard", label: "DASHBOARD" },
    { id: "docs",      label: "DOCS" },
    { id: "github",    label: "GITHUB", url: "https://github.com/AnushkaWaghmode" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNav("home")}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <span className="navbar-logo-title">LOADCTL</span>
        <span className="navbar-logo-version">v1.0</span>
      </div>
      <div className="navbar-links">
        {pages.map(p => (
          <button
            key={p.id}
            className={`nav-btn ${page === p.id ? "active" : ""}`}
            onClick={() => p.url ? window.open(p.url, "_blank") : onNav(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </nav>
  );
}