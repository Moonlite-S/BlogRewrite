import { BlogCard } from "@/Components/Blog/Card/BlogCard";
import heroImage from "@/features/Home/assets/hero_page.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/features/BlogList/api/FetchBlogs";
import { IBlogCard } from "@/interfaces/BlogType";
import { LoadingPage } from "@/loading";


export function Home() {
  return (
    <>
        <Hero />
        <RecentBlogs />
    </>
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
    const { data, isLoading, isError, error } = useQuery<IBlogCard[], Error>({
        queryKey: ["blogs"],
        queryFn: () => fetchBlogs(),
    });

    if (isLoading) {
        return <LoadingPage />;
    }
    
    if (isError) {
        console.error("Error fetching blogs:", error);
        return <div>Error loading blogs.</div>;
    }
    
    return (
        <div className="bg-base-200 min-h-screen w-full">
            <div className="hero-content flex-col w-full mx-auto">
                <h2 className="text-2xl font-bold">Recent Blogs</h2>

                {data?.slice(0, 3).map((blog) => (
                    <BlogCard key={blog.uuid} blog={blog} />
                ))}
            
                <button className="btn btn-primary" onClick={() => navigate("/blogs")}>View All Blogs</button>
            </div>
        </div>
    )
}