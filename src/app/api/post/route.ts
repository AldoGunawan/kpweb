import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const prisma = new PrismaClient();

// ✅ API GET: Ambil semua postingan
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error GET posts:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat mengambil data" },
      { status: 500 }
    );
  }
}

// ✅ API POST: Tambah postingan baru
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("imageUrl") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Judul dan konten harus diisi!" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop()?.toLowerCase();
      const allowedExts = ["jpg", "jpeg", "png", "webp"];
      if (!allowedExts.includes(fileExt || "")) {
        return NextResponse.json(
          { message: "Format gambar tidak valid!" },
          { status: 400 }
        );
      }

      const fileName = `images/${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload gagal:", error);
        return NextResponse.json(
          { message: "Gagal mengunggah gambar" },
          { status: 500 }
        );
      }

      imageUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${fileName}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error POST post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat membuat post" },
      { status: 500 }
    );
  }
}

// ✅ API DELETE: Hapus postingan
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    if (!id) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post berhasil dihapus" });
  } catch (error) {
    console.error("Error DELETE post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat menghapus post" },
      { status: 500 }
    );
  }
}

// ✅ API PUT: Update postingan
export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, imageUrl } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, imageUrl },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error PUT post:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat mengupdate post" },
      { status: 500 }
    );
  }
}
