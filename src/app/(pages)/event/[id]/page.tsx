/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

const DetailPage =   ({
    params,
}: {
   params: Promise<{ id: string }>;
}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch(`/api/post/${(await params).id}`);
            if (!res.ok) throw new Error("Data not found");
            const json = await res.json();

            if (!json.post) {
                router.push("/404");
                return;
            }

            setTitle(json.post.title);
            setContent(json.post.content);
            setImageUrl(json.post.imageUrl || null);
        } catch (error) {
            console.error("Error fetching data:", error);
            router.push("/404");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-5">
            {imageUrl && (
                <div className="flex justify-center mb-5">
                    <Image
                        src={imageUrl}
                        alt="Event Image"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-md object-cover"
                    />
                </div>
            )}
            <h1 className="text-3xl font-bold mb-3 text-center">{title}</h1>
            <p className="text-gray-700 break-words overflow-hidden">{content}</p>
        </div>
    );
};

export default DetailPage;
