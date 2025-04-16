import { BlogList, BlogPagination } from "./BlogList/BlogList"
import BlogHeaderImage from "../assets/header-coffee.jpg"

export function Blogs() {
    return (
        <div className="bg-base-200 flex-col justify-center min-h-screen pb-10">
            <BlogHeader />
            <BlogList />
            <BlogPagination />
        </div>
    )
}

function BlogHeader() {
    return (
        <div className="flex flex-col justify-center">
            <img src={BlogHeaderImage} alt="Blog Header" className="min-h-[200px] max-h-[300px] w-full bg-base-content object-cover" />
            <h2 className="text-2xl text-center py-4 font-bold text-accent">Blogs</h2>
        </div>
    )
}