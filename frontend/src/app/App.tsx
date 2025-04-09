import { Route, Routes } from "react-router-dom";
import LoginRoute from "@/features/Login/LoginRoute";
import Home from "@/features/Home/HomeRoute";
import NavBarRoute from "@/features/NavBar/NavBar";

export function App() {
  return (
    <Routes>
      {/* NavBar covers the majority of the app */}
      <Route element={<NavBarRoute />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginRoute />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

function NotFound() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not Found</h1>
          <p className="py-6">The page you are looking for does not exist.</p>
        </div>
      </div>
    </div>
  )
}
