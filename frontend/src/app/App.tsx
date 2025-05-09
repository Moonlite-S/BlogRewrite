import { Route, Routes } from "react-router-dom";
import LoginRoute from "@/features/Login/LoginRoute";
import Home from "@/features/Home/HomeRoute";
import NavBarRoute from "@/features/NavBar/NavBar";
import { FooterOutlet } from "@/Components/Footer/FooterOutlet";
import { BlogRoute } from "@/features/Blog/BlogRoute";
import { Blogs } from "@/features/BlogList/components/Blogs";
import { ErrorBoundary } from "react-error-boundary";

export function App() {
  return (
    <ErrorBoundary fallback={<NotFound />}>
      <Routes>
        {/* NavBar covers the majority of the app */}
        <Route element={<NavBarRoute />}>
            {/* Footer is only shown on most pages (typically ones that the non-logged in user can access) */}
            <Route element={<FooterOutlet />}>
              <Route index element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />

              <Route path="/blogs/:blogId" element={<BlogRoute />} />
            </Route>

            <Route path="/login" element={<LoginRoute />} />
          
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
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
