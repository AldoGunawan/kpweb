'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAccountNavbar from "./components/UserAccountNavbar";

const NavbarPage = () => {
  const { data: session } = useSession(); // Ambil session secara real-time
  const isKepsek = session?.user?.role === "KepalaSekolah";

  return (
    <header className="p-4 border-b flex items-center justify-between text-gray-900 bg-[#99DDA1]">
      <div className="text-xl font-bold">
        <Link href="/">SMP Negeri 10 TAPUNG</Link>
      </div>

      <div className="flex items-center space-x-8">
        <nav className="flex space-x-8">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/event" className="hover:text-white transition">Event</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          {isKepsek && ( // Hanya admin yang melihat menu Admin
            <Link href="/admin" className="hover:text-white transition">Admin</Link>
          )}
        </nav>

        {session?.user && <UserAccountNavbar />}
      </div>
    </header>
  );
};

export default NavbarPage;
