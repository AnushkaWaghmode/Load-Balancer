# Load Balancer Dashboard

A React-based web application for monitoring and simulating load balancing across multiple servers. Built with Vite for fast development and hot module replacement.

## Features

- Real-time server monitoring with interactive charts
- Server status cards displaying key metrics
- Simulation mode for testing load balancing scenarios
- Responsive UI with modern design

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Charts**: Recharts
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/components/` - Reusable UI components (ServerCard, ChartCard, Navbar, etc.)
- `src/pages/` - Main application pages (Dashboard, Docs, Home)
- `src/hooks/` - Custom React hooks for data management and simulation
- `public/` - Static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is licensed under the MIT License.
