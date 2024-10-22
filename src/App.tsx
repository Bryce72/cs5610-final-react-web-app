import SignIn from "./SignIn";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="SignIn" />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
    </HashRouter>
  );
}