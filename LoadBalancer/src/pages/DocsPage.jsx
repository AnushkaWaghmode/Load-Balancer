import { Btn } from "../components/UI";

const DOCS = [
  { n:1, title:"Quick Start",        color:"#00ff88", content:"Install and run in under 2 minutes.",                  code:"pip install fastapi uvicorn httpx\npython load_balancer.py" },
  { n:2, title:"Least-Connections",  color:"#4fc3f7", content:"Routes to backend with lowest weighted connections.", code:"score = connections / weight  # lowest score gets request" },
  { n:3, title:"REST API",           color:"#ffd700", content:"Full programmatic control over the backend pool.",    code:"GET /lb/metrics\nPOST /lb/servers\nDELETE /lb/servers/{id}" },
  { n:4, title:"WebSocket Stream",   color:"#ff9500", content:"Live metrics pushed on every request completion.",    code:'const ws = new WebSocket("ws://localhost:8000/lb/ws")' },
  { n:5, title:"Health Checks",      color:"#00ff88", content:"Every backend checked every 5s. 3 failures = offline.", code:"GET /health → 200 OK  # auto-recovery" },
];

export default function DocsPage({ onNav }) {
  return (
    <div className="docs-page">
      <div className="docs-inner">

        {/* Header */}
        <div className="docs-header">
          <Btn v="ghost" onClick={() => onNav("home")}>← BACK</Btn>
          <div>
            <h1 className="docs-title">Documentation</h1>
            <div className="docs-subtitle">LOADCTL</div>
          </div>
        </div>

        {/* Doc entries */}
        {DOCS.map(d => (
          <div key={d.n} className="doc-card" style={{ borderLeftColor: d.color }}>
            <div className="doc-card-head">
              <div className="doc-num" style={{ color: d.color, background: d.color + "14", borderColor: d.color + "30" }}>
                {d.n}
              </div>
              <h2 className="doc-card-title" style={{ color: d.color }}>{d.title}</h2>
            </div>
            <p className="doc-content">{d.content}</p>
            <pre className="doc-code">{d.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}