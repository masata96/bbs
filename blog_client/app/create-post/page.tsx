"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../Home.module.css"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreatePost = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(title, content)

        //APIを叩く
        try {
            await axios.post("http://localhost:3001/api/v1/posts",{
                title: title,
                content: content,
            });

            router.push("/")
        }catch(err){
            alert("投稿に失敗しました")
        }
    }

    return (
        <div className={styles.container}>
        <Link href="/" >ホームに戻る</Link>
            <h1 className={styles.title}>ブログ新規登録</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input type="text" className={styles.input}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)}/>
                <label className={styles.label}>本文</label>
                <textarea className={styles.textarea}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)}/>
                <button className={styles.button} type="submit">投稿</button>
            </form>
        </div>
    )
}

export default CreatePost