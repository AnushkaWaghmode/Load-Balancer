import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { D } from "../theme";

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p style={{ color: D.mute, marginBottom: 4 }}>{label}s</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <b>{p.value}{unit}</b>
        </p>
      ))}
    </div>
  );
}

export default function ChartCard({ title, data, lines, unit, yFmt, h = 200 }) {
  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <ResponsiveContainer width="100%" height={h}>
        <LineChart data={data} margin={{ top: 5, right: 8, bottom: 0, left: -8 }}>
          <CartesianGrid stroke={D.bdr} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="t"
            tickFormatter={v => `${v}s`}
            tick={{ fill: D.mute, fontSize: 10 }}
            axisLine={false} tickLine={false}
            interval={~~(data.length / 5)}
          />
          <YAxis
            tickFormatter={yFmt || (v => v)}
            tick={{ fill: D.mute, fontSize: 10 }}
            axisLine={false} tickLine={false}
            width={yFmt ? 58 : 28}
          />
          <Tooltip content={<ChartTooltip unit={unit} />} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={v => <span style={{ color: D.sub }}>{v}</span>}
          />
          {lines.map(l => (
            <Line
              key={l.key} type="monotone" dataKey={l.key} name={l.name}
              stroke={l.color} strokeWidth={2} dot={false} isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}