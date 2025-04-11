import { BlogCard } from "@/Components/Blog/Card/BlogCard";
import heroImage from "@/features/Home/assets/hero_page.jpg";
import { useNavigate } from "react-router-dom";

export function Home() {
  return (
    <div>
        <Hero />
        <RecentBlogs />
    </div>
  )
}

function Hero() {
    const navigate = useNavigate();
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}>
            <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Welcome to my website! I hope you find something useful here.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate("/blogs")}>Latest Blogs</button>
                </div>
            </div>
        </div>        
    )
}

function RecentBlogs() {
    const navigate = useNavigate();
    return (
        <div className="bg-base-200 min-h-screen">
            <div className="hero-content  flex-col">
                <h2 className="text-2xl font-bold">Recent Blogs</h2>

                <BlogCard />
                <BlogCard />
                <BlogCard />
                
                <button className="btn btn-primary" onClick={() => navigate("/blogs")}>View All Blogs</button>
            </div>
        </div>
    )
}