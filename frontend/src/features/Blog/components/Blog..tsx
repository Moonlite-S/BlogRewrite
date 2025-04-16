import { fetchBlog } from "@/features/BlogList/api/FetchBlogs";
import { IBlog } from "@/interfaces/BlogType";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LoadingPage } from "@/loading";

/**
 * Blog Component Module
 * 
 * This module contains components for displaying individual blog posts with navigation.
 * The main components are:
 * 
 * - BlogContentWrapper: Container component that handles data fetching and layout
 * - BlogDisplay: Renders the actual blog content
 * - BlogPreviousButton: Navigation button for previous blog post
 * - BlogNextButton: Navigation button for next blog post
 * - BlogFooter: Footer component for blog posts
 * 
 * The components use React Query for data fetching and React Router for navigation.
 * Styling is done with Tailwind CSS and DaisyUI theme system.
 * 
 * @module Blog
 */

export function BlogContentWrapper({ blogId }: { blogId: string }) {
    const { data, isLoading, isError, error } = useQuery<IBlog, Error>({
        queryKey: ["blog", blogId],
        queryFn: () => fetchBlog(blogId),
    });

    if (isLoading) {
        return <LoadingPage />;
    }

    if (isError) {
        console.error("Error fetching blog:", error);
        return <div>Error loading blog post.</div>;
    }
    
    return (
        <div className="h-screen flex flex-col items-center">
            <div className="flex flex-row items-center justify-center gap-5 h-full w-full">
                <div className="w-[150px]">
                    {data?.previousBlog && <BlogPreviousButton previousBlogId={data.previousBlog} />}
                </div>

                <BlogDisplay blog={data!} /> 
                
                <div className="w-[150px]">
                    {data?.nextBlog && <BlogNextButton nextBlogId={data.nextBlog} />}
                </div>
            </div>
            
            <BlogFooter />
        </div>
    );
}

// Renamed the original content display component
function BlogDisplay({ blog }: { blog: IBlog }) {
    return (
        <div className="w-3/4 h-7/8 bg-base-100 rounded-xl shadow-lg p-8 border border-gray-300 overflow-y-auto">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-gray-500">
                {blog.content}
            </p>
        </div>
    )
}

// Button and Footer components remain unchanged
function BlogPreviousButton({ previousBlogId }: { previousBlogId: string }) {
    return (
        <Link to={`/blogs/${previousBlogId}`} className="block bg-base-100 rounded-xl shadow-lg p-8 border border-gray-300 text-accent w-full text-center hover:bg-neutral-content hover:text-white transition-all duration-300">Previous</Link>
    )
}

function BlogNextButton({ nextBlogId }: { nextBlogId: string }) {
    return (
        <Link to={`/blogs/${nextBlogId}`} className="block bg-base-100 rounded-xl shadow-lg p-8 border border-gray-300 text-accent w-full text-center hover:bg-neutral-content hover:text-white transition-all duration-300">Next</Link>
    )
}

function BlogFooter() {
    return (
        <Link to="/blogs" className="bg-base-100 rounded-xl shadow-lg p-8 border border-gray-300 mb-8 text-accent text-center hover:bg-neutral-content hover:text-white transition-all duration-300">Back to Blog List</Link> 
    )
}