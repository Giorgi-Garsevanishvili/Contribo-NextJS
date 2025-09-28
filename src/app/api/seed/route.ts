import { PrismaClient } from "@/generated/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const body = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
  },
  {
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
  },
];

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
    await prisma.user.createMany({ data: body });
    return NextResponse.json({ success: true, message: "users created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to create" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is missing",
      });
    }

    await prisma.user.delete({ where: { id: String(id) } });
    return NextResponse.json({
      success: true,
      message: `user with id: ${id} successfully deleted!`,
    });
  } catch (error) {
    console.error();
    return NextResponse.json({
      success: false,
      message: "failed to delete user",
    });
  } finally {
    prisma.$disconnect();
  }
}
