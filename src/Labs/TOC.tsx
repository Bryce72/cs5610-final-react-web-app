import { useLocation } from "react-router";
import React from "react";

export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills" id="wd-toc">
      <li className="nav-item"><a id="wd-a" href="#/Labs" className="nav-link">Labs</a></li>
      <li className="nav-item"><a id="wd-a1" href="#/Labs/Lab1"
        className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</a></li>
      <li className="nav-item"><a id="wd-a2" href="#/Labs/Lab2"
        className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</a></li>
      <li className="nav-item"><a id="wd-a3" href="#/Labs/Lab3"
        className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</a></li>
      <li className="nav-item"><a id="wd-a4" href="#/Labs/Lab4"
        className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</a></li>
      <li className="nav-item"><a id="wd-a4" href="#/Labs/Lab5"
        className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</a></li>

      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/Xuedinan/cs5610kanbas" className="nav-link">
          My GitHub for Web App
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://github.com/Xuedinan/kanbas-node-server-app" className="nav-link">
          My GitHub for Server App
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="https://kanbas-node-server-app-aaui.onrender.com" className="nav-link">
          Link for Render
        </a>
      </li>
    </ul>
  );
}


