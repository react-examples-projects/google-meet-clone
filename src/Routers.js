import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/App";
import Forms from "./pages/Forms";
import Meet from "./pages/meet";
import Meeting from "./Components/Meeting";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forms" element={<Forms />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/" element={<Register />} index />
      </Routes>
    </BrowserRouter>
  );
}
