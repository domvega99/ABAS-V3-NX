"use server"

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")

    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }

    const posts = await response.json() as Post[];
    return posts
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw new Error("Failed to fetch posts")
  }
}

export async function fetchPostById(id: number): Promise<Post> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch post")
    }

    const post = await response.json() as Post;
    return post
  } catch (error) {
    console.error("Error fetching post:", error)
    throw new Error("Failed to fetch post")
  }
}
