import { useState } from "react";
import "./index.css";
import Navbar        from "./components/Navbar";
import HomePage      from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import DocsPage      from "./pages/DocsPage";
 
export default function App() {
  const [page, setPage] = useState("home");
 
  const nav = id => {
    if (id !== "github") {
      setPage(id);
      window.scrollTo(0, 0);
    }
  };
 
  return (
    <>
      <Navbar page={page} onNav={nav} />
      {page === "home"      && <HomePage      onNav={nav} />}
      {page === "dashboard" && <DashboardPage onNav={nav} />}
      {page === "docs"      && <DocsPage      onNav={nav} />}
    </>
  );
}