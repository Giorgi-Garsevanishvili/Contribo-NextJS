"use server";

import { PrismaClient } from "@/generated/prisma";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function findOne(id: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user; // ✅ Just return the data, no NextResponse
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    await prisma.user.update({
      where: { id },
      data: { name, email },
    });

  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Update failed");
  }
  redirect("/user");
}
