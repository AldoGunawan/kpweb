"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    post: Post;
}

interface Post {
    id: number;
    title: string;
    content: string;

    description: string;
    createdAt: string;
    imageUrl?: string;
  }

  
const Item = ({ post }: Props) => {
    const router = useRouter();
    const { data: session } = useSession(); // Ambil session user

    // Cek apakah user adalah admin
    const isAdmin = session?.user?.role === "admin";

    const handleDelete = async (id: number) => {
        await fetch("/api/post?id=" + id, {
            method: "DELETE",
        });
        router.refresh();
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-lg space-y-3"> {/* Memberikan sedikit jarak antar card */}
                <Link href={`/event/${post.id}`} className="block">
                    <div className="flex items-center gap-4 border p-5 rounded-lg shadow-md bg-white 
                        hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                        
                        {/* Gambar di kiri */}
                        {post.imageUrl && (
                            <div className="w-1/3 min-w-[120px]">
                                <Image 
                                    src={post.imageUrl} 
                                    alt="Event Image"
                                    width={140} 
                                    height={100} 
                                    className="object-cover rounded-md w-full h-auto"
                                />
                            </div>
                        )}
        
                        {/* Konten di kanan */}
                        <div className="w-2/3">
                            <h1 className="text-md font-bold mb-1">{post.title}</h1>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                        </div>
                    </div>
                </Link>
        
                {/* Tombol hanya untuk admin */}
                {isAdmin && (
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-600"
                            onClick={(e) => { e.stopPropagation(); router.push(`/event/update/${post.id}`); }}
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600"
                            onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
        

    
    );
};

export default Item;
