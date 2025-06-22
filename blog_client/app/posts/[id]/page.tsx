import { Post } from "../../../types/post"
import styles from "./Post.module.css"
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>;
};

export const revalidate = 60  // 60秒ごとに再ビルド

export async function generateStaticParams() {
    const res = await fetch("http://localhost:3001/api/v1/posts");
    const posts: { id: number }[] = await res.json();

    return posts.map((post) => ({
    id: post.id.toString(),
    }));
}

export default async function PostPage({ params }: Props) {
  // ★ まず await してから id を取り出す
    const { id } = await params;
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, {
    // SSR にしたいときは cache:'no-store'
    })
    const post: Post = await res.json()

    return (
    <div className={styles.container}>
        <Link href={`/`}>ホームに戻る</Link>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.date}>{post.created_at}</div>
        <p className={styles.content}>{post.content}</p>
    </div>
    )
}
