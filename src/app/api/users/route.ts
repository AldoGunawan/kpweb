/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { db } from "../route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // Hash password sebelum simpan ke database
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        role: "user", // Default role bisa diubah sesuai kebutuhan
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambahkan user" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const post = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({});
};

export async function PUT(req: Request) {
  try {
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { error: "ID dan role wajib diisi" },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengupdate role" },
      { status: 500 }
    );
  }
}
