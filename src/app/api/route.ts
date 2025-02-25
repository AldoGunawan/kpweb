import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

const prisma = new PrismaClient();
export const db = prisma;
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  return NextResponse.json({ authenticated: !!session });
};

export const POST = async (req: NextRequest) => {
  const { title, content, name, email, imageUrl } = await req.json();

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
    },
  });
  return NextResponse.json(post);
};

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const post = await prisma.post.delete({
    where: {
      id: id,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({});
};

export const PUT = async (
  name: string,
  image: File,
  p0: { access: string; multipart: boolean },
  req: NextRequest
) => {
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
