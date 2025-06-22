"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from "../../Home.module.css"; // 適宜パスを調整
import { Post } from "@/types/post";

type Props = {
    post: Post;
};

export default function EditPostForm({ post }: Props) {
    const router = useRouter();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        await axios.put(
        `http://localhost:3001/api/v1/posts/${post.id}`,
        { title, content }
        );
        router.push(`/`);
    } catch (err) {
        alert("編集に失敗しました");
    }
    };

    return (
    <div className={styles.container}>
        <Link href={`/`}>ホームに戻る</Link>
        <h1 className={styles.title}>ブログの編集</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
            }
        />

        <label className={styles.label}>本文</label>
        <textarea
            className={styles.textarea}
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
            }
        />

        <button className={styles.button} type="submit">
            保存
        </button>
        </form>
    </div>
    );
}
