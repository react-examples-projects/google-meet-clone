import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/App";
import Forms from "./pages/Forms";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forms" element={<Forms />} index />
        <Route path="/" element={<Register />} index />
      </Routes>
    </BrowserRouter>
  );
}
