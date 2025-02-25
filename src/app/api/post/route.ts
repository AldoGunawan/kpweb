import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ posts });
}

export const POST = async (req: NextRequest) => {
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

    const user = await supabase.auth.getUser();
    if (!user || !user.data) {
      console.error("User tidak ditemukan. Harap login.");
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop()?.toLowerCase();

      // Validasi tipe file
      const allowedExts = ["jpg", "jpeg", "png", "webp"];
      if (!allowedExts.includes(fileExt || "")) {
        return NextResponse.json(
          { message: "Format gambar harus JPG, JPEG, PNG, atau WEBP!" },
          { status: 400 }
        );
      }

      const imageBlob = new Blob([imageFile], { type: imageFile.type });

      const fileName = `images/${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("post-event")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: true, // Jika true, file akan ditimpa jika sudah ada
        });

      console.log("Upload Data:", data);
      console.log("Upload Error:", error);

      imageUrl = `${supabaseUrl}/storage/v1/object/public/post-event/${fileName}`;
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });

    revalidatePath("/event");
    return NextResponse.json(post);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const post = await prisma.post.delete({
    where: {
      id,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({});
};

export const PUT = async (req: NextRequest) => {
  const { title, content, id, imageUrl } = await req.json();

  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
      imageUrl,
    },
  });

  return NextResponse.json(post);
};
