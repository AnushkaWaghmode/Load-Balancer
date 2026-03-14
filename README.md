# Load-Balancer-
# ⚡ LOADCTL — Smart Load Balancer Dashboard

A real-time load balancer dashboard built with **React + Vite**. Visualizes how traffic is distributed across multiple servers using the **Least-Connections algorithm**.

> ⚠️ This is a **frontend-only demo** — all server data is simulated using JavaScript. No backend required to run.

---

## 📸 Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, traffic flow diagram, feature cards, live simulation preview |
| **Dashboard** | Real-time charts, server status cards, total request counter |
| **Docs** | Setup guide, API reference, algorithm explanation |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Charts | Recharts |
| Styling | Plain CSS (no UI library) |
| Fonts | Google Fonts (Orbitron, Share Tech Mono, DM Sans) |
| Language | JavaScript (JSX) |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root router
├── main.jsx                 # Entry point
├── index.css                # All global styles
├── theme.js                 # Shared color constants
│
├── hooks/
│   ├── useSimulation.js     # Home page live traffic simulation
│   └── useDashData.js       # Dashboard chart & server data
│
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   ├── UI.jsx               # Shared: Btn, Spark, Section
│   ├── ChartCard.jsx        # Recharts line chart wrapper
│   └── ServerCard.jsx       # Collapsible server status card
│
└── pages/
    ├── HomePage.jsx         # Hero, features, traffic preview
    ├── DashboardPage.jsx    # Charts + server sidebar
    └── DocsPage.jsx         # Documentation entries
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/loadctl.git
cd loadctl
```

### 2. Install dependencies
```bash
npm install
npm install recharts
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## ⚙️ How It Works

### Least-Connections Algorithm
Each incoming request is routed to the server with the **lowest weighted connection count**:

```
score = active_connections / weight
# Server with the lowest score receives the next request
```

Servers with higher weights receive proportionally more traffic.

### Simulation
The dashboard simulates live data using `setInterval` and `Math.random()`:

- **`useSimulation.js`** — updates server connections every 700ms
- **`useDashData.js`** — updates chart data every 1000ms

No real network calls are made — everything runs in the browser.

---

## 📊 Dashboard Features

- **Total Requests Counter** — live incrementing request count
- **Active Connections Chart** — line chart for all 3 servers
- **Response Times Chart** — latency over time
- **Server Status Panel** — toggle servers online/offline
- **Traffic Simulation** — start/stop live data on the home page

---

## 🔌 Adding a Real Backend (Optional)

To connect to a real FastAPI backend:

### Install backend dependencies
```bash
pip install fastapi uvicorn httpx
```

### Replace simulation with real API calls
```js
// Instead of Math.random(), fetch from your API:
const res = await fetch("http://localhost:8000/lb/metrics");
const data = await res.json();
```

### Backend endpoints (if you build one)
```
GET  /lb/metrics           # Full stats JSON
POST /lb/servers           # Add a backend server
DELETE /lb/servers/{id}    # Remove a server
POST /lb/servers/{id}/toggle  # Toggle online/offline
GET  /lb/ws                # WebSocket for live metrics
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Deploy to any static host (Vercel, Netlify, GitHub Pages).

---


---

## 👤 Author

Built with React + Vite. Designed for learning load balancing concepts visually.
