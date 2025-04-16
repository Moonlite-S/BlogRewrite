import { Link } from "react-router-dom";
import { IBlogCard } from "@/interfaces/BlogType";

export function BlogCard({blog}: {blog: IBlogCard}) {
    return (
        <div className="card lg:card-side bg-base-100 shadow-md w-full">
            <figure>
                <img
                    src={blog.image}
                    alt="blog image" />
            </figure>
            
            <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.content}</p>
                <div className="card-actions justify-end">
                <Link to={`/blogs/${blog.uuid}`} className="btn btn-primary">Read More</Link>
                </div>
            </div>
        </div>
    )
}