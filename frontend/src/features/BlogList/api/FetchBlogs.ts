import { IBlogCard, IBlog } from "@/interfaces/BlogType";
import axiosInstance from "@/axios";

// Normal fetch all blogs
export async function fetchBlogs(): Promise<IBlogCard[]> {
    const response = await axiosInstance.get<IBlogCard[]>("blogs");
    return response.data;
}

// Fetch a single blog by uuid
export async function fetchBlog(uuid: string): Promise<IBlog> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axiosInstance.get<IBlog>(`blogs/${uuid}`);
    return response.data;
}

// Fetch blogs by tag (Only one tag per blog)
export async function fetchBlogsByTag(tag: string): Promise<IBlogCard[]> {
    const response = await axiosInstance.get<IBlogCard[]>(`blogs/tag/${tag}`);
    return response.data;
}

// Fetch blogs by title (Search)
export async function fetchBlogsByTitle(title: string): Promise<IBlogCard[]> {
    const response = await axiosInstance.get<IBlogCard[]>(`blogs/title/${title}`);
    return response.data;
}



