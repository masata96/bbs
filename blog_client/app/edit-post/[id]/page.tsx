import { notFound } from "next/navigation";
import { Post } from "@/types/post";
import EditPostForm from "./EditPostForm";

export const revalidate = 60; // ISR: 60秒ごとに再ビルド

type Params = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Params) {
    const { id } = await params;
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`, {
    cache: "no-store", // 最新データを常に取得
    });
    if (!res.ok) {
        return notFound();
    }

    const post: Post = await res.json();
    return <EditPostForm post={post} />;
}