import { useState } from "react";
import { D } from "../theme";

export default function ServerCard({ s, color, onToggle }) {
  const [open, setOpen] = useState(true);
  const onlineClass = s.online ? "online" : "offline";

  return (
    <div className="srv-card">
      {/* Header — click to collapse */}
      <div className="srv-card-header" onClick={() => setOpen(o => !o)}>
        <div className="srv-card-info">
          <div className={`srv-icon ${onlineClass}`}>✓</div>
          <div>
            <div className="srv-name">{s.name}</div>
            <div className="srv-url">{s.url}</div>
          </div>
        </div>
        <span className="srv-toggle">{open ? "∧" : "∨"}</span>
      </div>

      {/* Body — collapsible */}
      {open && (
        <div className="srv-body">
          <div className="srv-status-row">
            <span className="srv-dot" style={{ background: s.online ? D.s3 : D.s1 }} />
            <span className="srv-status-label" style={{ color: s.online ? D.s3 : D.s1 }}>
              {s.online ? "Online" : "Offline"}
            </span>
          </div>
          <div className="srv-stat">
            Connections: <span style={{ color }}>{s.conns}</span>
          </div>
          <div className="srv-stat mb">
            Response Time: <span style={{ color }}>{s.rt} ms</span>
          </div>
          <button
            className={`srv-toggle-btn ${onlineClass}`}
            onClick={() => onToggle(s.id)}
          >
            {s.online ? "Take Offline" : "Bring Online"}
          </button>
        </div>
      )}
    </div>
  );
}