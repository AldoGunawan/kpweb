"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ email: "", username: "", password: "", role: "user" });

  // Cek apakah pengguna adalah kepsek
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "KepalaSekolah") {
      router.push("/");
    }
  }, [session, status, router]);

  // Ambil data pengguna dari API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Gagal mengambil data pengguna", error);
    }
  };

  // Ubah role pengguna
  const handleChangeRole = async (id: number, newRole: string) => {
    try {
      console.log("Mengubah role user:", id, "menjadi:", newRole);
  
      const res = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });
  
      console.log("Response status:", res.status);
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengubah role");
      }
  
      // **Langsung update state biar tidak perlu refresh halaman**
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
  
      console.log("Role berhasil diperbarui!");
    } catch (error) {
      console.error("Error:" + error);
    }
  };
  

  // Hapus pengguna
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus pengguna", error);
    }
  };

  // Tambah pengguna baru
  const handleCreateUser = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        fetchUsers();
        setNewUser({ email: "", username: "", password: "", role: "user" });
      }
    } catch (error) {
      console.error("Gagal menambahkan pengguna", error);
    }
  };

  return (
    <div className="p-5">
      {/* Form Tambah User */}
      <div className="border p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Tambah User</h2>
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ 
            ...newUser, username: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ 
            ...newUser, password: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <label htmlFor="new-user-role">Role</label>
        <select
          id="new-user-role"
          value={newUser.role}
          onChange={(e) => setNewUser({ 
            ...newUser, role: e.target.value })}
          className="border p-2 w-full mb-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="KepalaSekolah">Kepala Sekolah</option>
        </select>
        <button onClick={handleCreateUser} className="bg-blue-500 text-white p-2 rounded">
          Tambah User
        </button>
      </div>

      {/* Daftar Pengguna */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Daftar Pengguna</h2>
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Email</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">
                  <select
                    defaultValue={user.role} // Mencegah error saat render awal
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="KepalaSekolah">Kepala Sekolah</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
