import { Navigate, useParams } from "react-router-dom";
import { BlogContentWrapper } from "./components/Blog.";
/**
 * These are Blog pages, which are displayed when the user clicks on a blog from the Blogs page
 * 
 * This checks if the blogId is valid and then displays the blog
 */
export function BlogRoute() {
    const { blogId } = useParams<{ blogId: string }>()

    if (!blogId) {
        console.error("Blog ID is missing from URL params. Redirecting...")
        return <Navigate to="/*" replace /> // Redirect to 404 page
    }

    return (
        <BlogContentWrapper key={blogId} blogId={blogId} />
    );
}