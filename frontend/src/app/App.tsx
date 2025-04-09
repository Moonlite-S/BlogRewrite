import { Route, Routes } from "react-router-dom";
import { LoginRoute } from "@/features/Login/LoginRoute";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRoute />} />
    </Routes>
  )
}