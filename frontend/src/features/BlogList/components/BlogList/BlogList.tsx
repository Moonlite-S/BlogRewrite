import { BlogCard } from "@/Components/Blog/Card/BlogCard";
import { BlogMenu } from "../BlogMenu/BlogMenu";
import { IBlogCard } from "@/interfaces/BlogType";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api/FetchBlogs";
import { LoadingPage } from "@/loading";

export function BlogList() {
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
        <div className="flex flex-col gap-4 w-full justify-center p-10">
            <BlogMenu />

            {data?.map((blog) => (
                <BlogCard key={blog.uuid} blog={blog} />
            ))}
        </div>
    )
}

// TODO: Implement pagination for blogs
// So: 1. Get the total number of blogs
// 2. Get the current page number
// 3. Get the number of blogs per page
// 4. Calculate the total number of pages
// 5. Display the pagination buttons
// 6. When a button is clicked, update the current page number
// 7. Update the blogs displayed based on the current page number
export function BlogPagination() {
    return (
        <div className="join justify-center w-full">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
        </div>
    )
}

