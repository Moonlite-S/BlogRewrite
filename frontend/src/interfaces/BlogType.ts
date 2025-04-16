
/**
 * Represents a blog post.
 * 
 * @property {string} uuid - The unique identifier for the blog post.
 * @property {string} title - The title of the blog post.
 * @property {string} content - The content of the blog post.
 * @property {string} createdAt - The date and time the blog post was created.
 * @property {string} updatedAt - The date and time the blog post was last updated.
 * @property {string} author - The author of the blog post.
 * @property {string[]} tags - The tags associated with the blog post.
 * @property {string} image - The image associated with the blog post.
 * @property {boolean} isPublished - Whether the blog post is published.
 */
export interface IBlog {
    uuid: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    tags: string[];
    image: string;
    isPublished: boolean;

    previousBlog?: string;//uuid
    nextBlog?: string;//uuid
}

/**
 * This is for the BlogList page.
 * 
 * @property {IBlogCard[]} blogs - The list of blogs. (Card version)
 * @property {number} total - The total number of blogs.
 * @property {number} page - The current page number.
 * @property {number} limit - The number of blogs per page.
 */
export interface IBlogList {
    blogs: IBlogCard[];
    total: number;
    page: number;
    limit: number;
}

/**
 * This is for the Card on the BlogList page.
 * 
 * @property {string} uuid - The unique identifier for the blog post.
 * @property {string} title - The title of the blog post.
 * @property {string} image - The image associated with the blog post.
 * @property {string} content - The content of the blog post.
 */
export interface IBlogCard {
    uuid: string;
    title: string;
    image: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}
