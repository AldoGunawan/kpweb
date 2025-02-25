import * as z from "zod";

import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { db } from "../../route";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(100),
  email: z
    .string()
    .email()
    .min(3, "Email must be at least 3 characters long")
    .max(100),
  password: z
    .string()
    .min(4, "Password must be at least 6 characters long")
    .max(100),
});

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    ///checking email
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 400 }
      );
    }

    ///checking username
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        role: "user",
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
