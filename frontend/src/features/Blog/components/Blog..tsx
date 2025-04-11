import { useEffect } from "react";

export function Blog({ blogId }: { blogId: string | undefined; }) {

    useEffect(() => {
        if (blogId) {
            console.log(blogId);
        }
    }, [blogId]);

    return (
        <div>
            <h1>Blog</h1>
        </div>
    );
}
