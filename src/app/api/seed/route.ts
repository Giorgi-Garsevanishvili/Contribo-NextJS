import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const body = {
  id: "",
  name: "lela",
  email: "lela@example.com",
};

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error();
    return NextResponse.json({
      success: false,
      message: "faild to fetch data",
    });
  }
}

export async function POST() {
  try {
    await prisma.user.create({ data: body });
    return NextResponse.json({ success: true, message: "users created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to create" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE() {
  try {
    await prisma.user.delete({ where: { id: String(body.id) } });
    return NextResponse.json({
      success: true,
      message: `user with id: ${body.id} successfully deleted!`,
    });
  } catch (error) {
    console.error();
    return NextResponse.json({
      success: false,
      message: "faild to delete user",
    });
  } finally {
    prisma.$disconnect();
  }
}
