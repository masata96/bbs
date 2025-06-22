import { Post } from "@/types/post";
import PostsList from "./PostsList";
import Link from "next/link";
import styles from "./Home.module.css";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const res = await fetch("http://localhost:3001/api/v1/posts", { cache: "no-store" });
  const posts: Post[] = await res.json();

  return (
    <main>
      <div className={styles.homeContainer}>
        <h1>My Blog</h1>
        <Link href="/create-post" className={styles.createButton}>
          Create New Post
        </Link>
        <PostsList posts={posts} />
      </div>
    </main>
  );
}