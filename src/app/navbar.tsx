'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAccountNavbar from "./components/UserAccountNavbar";

const NavbarPage = () => {
  const { data: session } = useSession(); // Ambil session secara real-time
  const isKepsek = session?.user?.role === "KepalaSekolah";

  return (
    <header className="p-4 border-b flex items-center justify-between text-slate-800">
      {/* Kiri: Nama Sekolah */}
      <div className="text-xl font-bold">
        <Link href="/">SMP Negeri 10 TAPUNG</Link>
      </div>

      {/* Kanan: Menu Navigasi + Login/Logout */}
      <div className="flex items-center space-x-8">
        <nav className="flex space-x-8">
          <Link href="/about" className="hover:text-blue-500 transition">About</Link>
          <Link href="/event" className="hover:text-blue-500 transition">Event</Link>
          <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
          {isKepsek && ( // Hanya admin yang melihat menu Admin
            <Link href="/admin" className="hover:text-blue-500 transition">Admin</Link>
          )}
        </nav>

        {/* Jika user login, tampilkan UserAccountNavbar */}
        {session?.user && <UserAccountNavbar />}
      </div>
    </header>
  );
};

export default NavbarPage;
