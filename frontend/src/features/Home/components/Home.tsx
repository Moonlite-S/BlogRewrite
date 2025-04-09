import heroImage from "@/features/Home/assets/hero_page.jpg";
import { useNavigate } from "react-router-dom";

export function Home() {
  return (
    <div>
        <Hero />
        <RecentBlogs />
        <Footer />
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

function BlogCard() {
    return (
        <div className="card lg:card-side bg-base-100 shadow-md">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">New album is released!</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Listen</button>
                </div>
            </div>
        </div>
    )
}
function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">Contact Me</h6>
                <a className="link link-hover" target="_blank" href="mailto:example@example.com">Email</a>
                <a className="link link-hover" target="_blank" href="https://www.linkedin.com/in/example">LinkedIn</a>
                <a className="link link-hover" target="_blank" href="https://github.com/example">GitHub</a>
            </nav>
            <nav>
                <h6 className="footer-title">Other Links</h6>
                <a className="link link-hover" onClick={() => navigate("/about")}>About me</a>
                <a className="link link-hover" onClick={() => navigate("/projects")}>Projects</a>
                <a className="link link-hover" onClick={() => navigate("/blogs")}>Blogs</a>
            </nav>
        </footer>
    )
}