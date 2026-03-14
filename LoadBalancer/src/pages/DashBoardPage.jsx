import ChartCard from "../components/ChartCard";
import ServerCard from "../components/ServerCard";
import useDashData from "../hooks/useDashData";
import { D } from "../theme";

const COLORS = [D.s1, D.s2, D.s3];
const lines  = keys => keys.map((k, i) => ({ key: k, name: `Server ${i + 1}`, color: COLORS[i] }));

export default function DashboardPage({ onNav }) {
  const { conn, rt, status, srvs, total, toggle } = useDashData();

  return (
    <div className="dash-page">

      {/* NAV */}
      <nav className="dash-nav">
        <div className="dash-nav-logo">
          <div className="dash-nav-icon">⚡</div>
          <span className="dash-nav-title">Load Balancer Dashboard</span>
        </div>
        {["Home", "Stats", "Settings"].map(p => (
          <button
            key={p}
            className={`dash-nav-btn ${p === "Home" ? "active" : ""}`}
            onClick={p === "Home" ? () => onNav("home") : undefined}
          >
            {p}
          </button>
        ))}
      </nav>

      {/* BODY */}
      <div className="dash-body">

        {/* LEFT COLUMN */}
        <div className="dash-left">
          {/* Total Requests */}
          <div className="dash-total-card">
            <div className="dash-total-icon">🖥</div>
            <div>
              <div className="dash-total-label">Total Requests</div>
              <div className="dash-total-value">{total.toLocaleString()}</div>
            </div>
          </div>

          {/* Charts */}
          <ChartCard title="Active Connections" data={conn}   lines={lines(["s1","s2","s3"])} h={220} />
          <div className="dash-charts-row">
            <ChartCard title="Response Times" data={rt}     lines={lines(["s1","s3"])} unit=" ms" yFmt={v => `${v} ms`} h={190} />
            <ChartCard title="Server Status"  data={status} lines={lines(["s1","s2"])} unit=" ms" yFmt={v => `${v} ms`} h={190} />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="dash-sidebar">
          <div className="dash-sidebar-title">Server Status</div>
          {srvs.map((s, i) => (
            <ServerCard key={s.id} s={s} color={COLORS[i]} onToggle={toggle} />
          ))}
        </div>
      </div>
    </div>
  );
}