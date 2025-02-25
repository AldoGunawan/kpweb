/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { email, username, role } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { email, username, role },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Gagal mengupdate user" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
