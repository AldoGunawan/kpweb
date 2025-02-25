"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
  
    const res = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });
  
    if (res.ok) {
      router.push("/event");
    } else {
      const errorData = await res.json();
      console.error("Gagal menambahkan event:", errorData.message);
    }
  };
  


  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
