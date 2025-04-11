import { useParams } from "react-router-dom";
import { Blog } from "./components/Blog.";
/**
 * These are Blog pages, which are displayed when the user clicks on a blog from the Blogs page
 * 
 * @param {string} blogId - The ID of the blog to display
 */
export function BlogRoute() {
    const { blogId } = useParams();
    return (
        <Blog blogId={blogId}/>
    )
}

