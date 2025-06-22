"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Home.module.css";
import { Post } from "@/types/post";

type Props = {
    posts: Post[];
};

export default function PostsList({ posts }: Props) {
    const router = useRouter();

    const handleDelete = async (postId: number) => {
    try {
        await axios.delete(`http://localhost:3001/api/v1/posts/${postId}`);
        router.refresh();
    } catch (err) {
        alert("削除に失敗しました");
    }
    };

    return (
    <div>
        {posts.map((p) => (
        <div key={p.id} className={styles.postCard}>
            <Link href={`/posts/${p.id}`} className={styles.postCardBox}>
            <h2>{p.title}</h2>
            </Link>
            <p>{p.content}</p>
            <Link href={`/edit-post/${p.id}`}>
            <button className={styles.editButton}>Edit</button>
            </Link>
            <button
            className={styles.deleteButton}
            onClick={() => handleDelete(p.id)}
            >
            Delete
            </button>
        </div>
        ))}
    </div>
    );
}
