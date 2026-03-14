import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Btn, Spark, Section } from "../components/UI";
import useSimulation from "../hooks/useSimulation";

const FEATURES = [
  { icon: "⟳", title: "Smart Routing",  sub: "Least-Connections", color: "#00ff88", action: null },
  { icon: "📡", title: "Health Monitor", sub: "Detects Status",    color: "#4fc3f7", action: null },
  { icon: "🗄",  title: "Distributed",   sub: "Multi-Backend",     color: "#ffd700", action: null },
  { icon: "📊", title: "Live Dashboard", sub: "Real-Time Metrics", color: "#ff9500", action: "dashboard" },
];

const STACK  = [["⚛", "#4fc3f7", "React"], ["🐍", "#ffd700", "Python"], ["⚡", "#00ff88", "FastAPI"]];
const LINKS  = [["GITHUB", () => window.open("https://github.com/AnushkaWaghmode", "_blank")], ["DOCS", null], ["LINKEDIN", () => window.open("https://linkedin.com", "_blank")]];

export default function HomePage({ onNav }) {
  const [sim, setSim] = useState(false);
  const { servers } = useSimulation(sim);

  return (
    <div style={{ background: "#050d18", minHeight: "100vh", color: "#c8dff0", fontFamily: "'DM Sans',sans-serif" }}>

      {/* HERO */}
      <div className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            SYSTEM ONLINE — LEAST-CONNECTIONS ROUTING
          </div>
          <h1 className="hero-title">
            <span>Load Balancer</span>
          </h1>
          <p className="hero-subtitle">Distributing traffic intelligently across servers.</p>
          <div className="hero-actions">
            <Btn v="primary" onClick={() => onNav("dashboard")}>▶ VIEW LIVE DASHBOARD</Btn>
            <Btn v="ghost"   onClick={() => window.open("https://github.com/AnushkaWaghmode", "_blank")}>⬡ VIEW ON GITHUB</Btn>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <Section tag="HOW IT WORKS" title="Traffic Flow">
        <div className="flow">
          <div className="flow-node">
            <div className="flow-emoji lg" style={{ border: "1px solid #4fc3f720", background: "#4fc3f70e" }}>👥</div>
            <span className="flow-label lg" style={{ color: "#4fc3f7" }}>Users</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-lb">⟳ Load Balancer</div>
          {servers.map((s) => (
            <span key={s.id} style={{ display: "contents" }}>
              <span className="flow-arrow">→</span>
              <div className="flow-node">
                <div className="flow-emoji sm" style={{ border: `1px solid ${s.color}22`, background: `${s.color}0e` }}>🖥</div>
                <span className="flow-label sm" style={{ color: s.color }}>{s.name}</span>
              </div>
            </span>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section tag="KEY FEATURES" title="Capabilities" dark>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className={`feature-card ${f.action ? "clickable" : ""}`}
              style={{ "--accent": f.color }}
              onClick={f.action ? () => onNav(f.action) : undefined}
              onMouseEnter={e => e.currentTarget.style.borderColor = f.color + "40"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-sub">{f.sub}</div>
              {f.action && <div className="feature-cta" style={{ color: f.color }}>→ OPEN</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* LIVE TRAFFIC PREVIEW */}
      <Section tag="LIVE TRAFFIC" title="Traffic Simulation" dark>
        <div className="preview-box">
          <div className="preview-controls">
            <Btn v={sim ? "small" : "primary"} onClick={() => setSim(true)}>
              {sim ? "⟳ SIMULATING..." : "▶ SIMULATE TRAFFIC"}
            </Btn>
            <Btn v="blue" onClick={() => onNav("dashboard")}>📊 OPEN DASHBOARD →</Btn>
          </div>
          <div className="preview-grid">
            {servers.map(s => (
              <div key={s.id} className="server-card" style={{ borderLeft: `2px solid ${s.color}44` }}>
                <div className="server-card-name" style={{ color: s.color }}>{s.name.toUpperCase()}</div>
                <div className="server-card-host">{s.host}:{s.port}</div>
                <div className="server-card-stat">
                  Connections: <span style={{ color: s.color }}>{s.conns}</span>
                </div>
                <Spark data={s.history} color={s.color} />
              </div>
            ))}
            {/* Bar chart */}
            <div className="server-card" style={{ borderLeft: "2px solid #4fc3f744" }}>
              <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: "#4fc3f7", letterSpacing: 3, marginBottom: 6 }}>REQUEST DIST.</div>
              <ResponsiveContainer width="100%" height={88}>
                <BarChart data={servers.map(s => ({ n: s.name.replace("Server ", "S"), v: s.conns }))} barSize={22} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                  <XAxis dataKey="n" tick={{ fontSize: 9, fill: "#2a4f6a" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: "#2a4f6a" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0a1428", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, fontSize: 10 }} cursor={{ fill: "rgba(79,195,247,0.04)" }} />
                  <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                    {servers.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-stack">
          {STACK.map(([icon, color, label]) => (
            <div key={label} className="footer-stack-item">
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span className="footer-stack-label" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="footer-links">
          {LINKS.map(([label, fn]) => (
            <button key={label} className="footer-link" onClick={fn || (() => onNav("docs"))}>{label}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}