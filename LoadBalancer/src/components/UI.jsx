/* ── Btn ── */
export function Btn({ children, v = "primary", onClick, sx = {} }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${v}`}
      style={sx}
    >
      {children}
    </button>
  );
}

/* ── Sparkline ── */
export function Spark({ data, color }) {
  const max = Math.max(...data, 1);
  return (
    <div className="spark">
      {data.map((val, i) => (
        <div
          key={i}
          className="spark-bar"
          style={{
            height: `${Math.max(6, (val / max) * 100)}%`,
            background: i === data.length - 1 ? color : color + "44",
          }}
        />
      ))}
    </div>
  );
}

/* ── Section wrapper ── */
export function Section({ tag, title, children, dark }) {
  return (
    <div className={`section ${dark ? "dark" : "light"}`}>
      <div className="section-header">
        <div className="section-tag">— {tag} —</div>
        <h2 className="section-title">{title}</h2>
      </div>
      {children}
    </div>
  );
}