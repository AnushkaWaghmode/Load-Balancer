import { useState, useEffect } from "react";
import { SC } from "../theme";

const PATHS   = ["/api/users", "/api/orders", "/api/products", "/api/search", "/api/auth"];
const METHODS = ["GET", "GET", "GET", "POST", "PUT"];

export default function useSimulation(active) {
  const [servers, setServers] = useState([
    { id:"s1", name:"Server 1", host:"10.0.1.10", port:8081, weight:2, conns:12, rt:45,  total:4820, healthy:true, history:[4,6,7,9,10,12], color:SC[0] },
    { id:"s2", name:"Server 2", host:"10.0.1.11", port:8082, weight:1, conns:7,  rt:80,  total:2310, healthy:true, history:[2,3,4,5,6,7],  color:SC[1] },
    { id:"s3", name:"Server 3", host:"10.0.1.12", port:8083, weight:3, conns:9,  rt:35,  total:7140, healthy:true, history:[3,4,5,7,8,9],  color:SC[2] },
  ]);
  const [rpsData, setRpsData] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({ i, rps: +(3 + Math.random() * 5).toFixed(1) }))
  );
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      // Update servers using least-connections algorithm
      setServers(p => {
        const h = p.filter(s => s.healthy);
        if (!h.length) return p;
        const tgt = [...h].sort((a, b) => a.conns / Math.max(a.weight, 1) - b.conns / Math.max(b.weight, 1))[0];
        return p.map(s => {
          const isTgt = s.id === tgt.id;
          const c = Math.max(1, Math.min(28, s.conns + Math.round((Math.random() - (isTgt ? 0.4 : 0.5)) * 4)));
          return {
            ...s, conns: c,
            rt:    isTgt ? Math.max(10, s.rt + Math.round((Math.random() - 0.5) * 12)) : s.rt,
            total: isTgt ? s.total + ~~(Math.random() * 4) + 1 : s.total,
            history: [...s.history.slice(-5), c],
          };
        });
      });

      setRpsData(p => [...p.slice(-23), { i: p.length, rps: +(2 + Math.random() * 8).toFixed(1) }]);

      setLogs(p => {
        const srv = ["s1", "s2", "s3"][~~(Math.random() * 3)];
        return [{
          id: Date.now(), server: srv,
          method: METHODS[~~(Math.random() * 5)],
          path:   PATHS[~~(Math.random() * 5)],
          status: Math.random() > 0.05 ? 200 : [500, 404, 503][~~(Math.random() * 3)],
          rt:     ~~(20 + Math.random() * 140),
          ts:     new Date().toLocaleTimeString("en", { hour12: false }),
        }, ...p.slice(0, 29)];
      });
    }, 700);
    return () => clearInterval(iv);
  }, [active]);

  const toggle = id => setServers(p => p.map(s => s.id === id ? { ...s, healthy: !s.healthy } : s));
  return { servers, rpsData, logs, toggle };
}
