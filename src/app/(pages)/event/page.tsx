import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import Item from './../../item';

interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  createdAt: string;
  imageUrl?: string;
}

const getPost = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
  const json = await res.json();
  return json;
};

const EventPage = async () => {
  const posts = await getPost();
  const session = await getServerSession(authOptions);
  console.log(session); // Dapatkan session user
  const isAdmin = session?.user?.role === "admin"; // Cek apakah user adalah admin

  return (
    <div className='p-5 rounded-md border-b leading-9 max-w-7xl mx-auto'>
      {isAdmin && (
        <Link 
          href="/event/create"
          className="flex justify-end mr-5 mt-3 text-black rounded-md uppercase text-sm font-bold tracking-widest"
        >
          Create
        </Link>
      )}

      <div className="list-container">
      {posts?.posts?.map((post: Post, index: number) => (
      <Item key={post.id} post={post} />))}


      </div>
    </div>
  );
};

export default EventPage;
