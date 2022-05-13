import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meet from "./pages/Meet";
import Meeting from "./Components/Meeting";
import NotFound from "./pages/NotFound";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/" element={<Meet />} index />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
