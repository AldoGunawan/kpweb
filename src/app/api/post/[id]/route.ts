import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const id = Number((await context.params).id) || 0;

  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ post });
};
