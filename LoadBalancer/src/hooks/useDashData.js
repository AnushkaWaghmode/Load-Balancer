import { useState, useEffect, useRef } from "react";
import {MAX} from "../theme";

export default function useDashData() {
  // Helper: generate initial chart data with 3 series
  function mk(bases, spread) {
        return Array.from({ length: MAX }, (_, i) => ({
            t: i * 2,
            s1: Math.round(bases[0] + (Math.random() - 0.5) * spread),
            s2: Math.round(bases[1] + (Math.random() - 0.5) * spread),
            s3: Math.round(bases[2] + (Math.random() - 0.5) * spread),
        }));
    }

  const [conn,   setConn]   = useState(() => mk([24, 19, 13], 12));
  const [rt,     setRt]     = useState(() => mk([1150, 1080, 960], 400));
  const [status, setStatus] = useState(() =>
    Array.from({ length: MAX }, (_, i) => ({
      t:  i * 2,
      s1: Math.round(1000 + (Math.random() - 0.5) * 400),
      s2: Math.round(900  + (Math.random() - 0.5) * 400),
    }))
  );
  const [srvs, setSrvs] = useState([
    { id: 1, name: "Server 1", url: "http://127.0.0.1:3001", conns: 920,  rt: 920,  online: true },
    { id: 2, name: "Server 2", url: "http://127.0.0.1:8002", conns: 799,  rt: 799,  online: true },
    { id: 3, name: "Server 3", url: "http://127.0.0.1:3003", conns: 1103, rt: 1103, online: true },
  ]);
  const [total, setTotal] = useState(1250);
  const tick = useRef(MAX * 2);

  useEffect(() => {
    const iv = setInterval(() => {
      const t = tick.current; tick.current += 2;

      setTotal(p => p + ~~(Math.random() * 7) + 1);
      setSrvs(p => p.map(s => ({
        ...s,
        conns: Math.max(300, Math.min(1800, s.conns + Math.round((Math.random() - 0.5) * 80))),
        rt:    Math.max(300, Math.min(1800, s.rt    + Math.round((Math.random() - 0.5) * 80))),
      })));

      // Generic chart updater: appends a new data point clamped to [lo, hi]
      const upd = (set, keys, lo, hi, spread) =>
        set(p => [...p.slice(-MAX + 1), {
          t,
          ...Object.fromEntries(keys.map(k => [k,
            Math.max(lo, Math.min(hi, (p[p.length - 1][k] || lo) + Math.round((Math.random() - 0.5) * spread)))
          ])),
        }]);

      upd(setConn,   ["s1","s2","s3"], 5,   38,   5);
      upd(setRt,     ["s1","s2","s3"], 600, 1700, 110);
      upd(setStatus, ["s1","s2"],      600, 1500, 90);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const toggle = id => setSrvs(p => p.map(s => s.id === id ? { ...s, online: !s.online } : s));
  return { conn, rt, status, srvs, total, toggle };
}