import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type NewUser = {
  name: string;
  email: string;
};

type Body = NewUser[];

// const body = [
//   {
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//   },
//   {
//     name: "Bob Smith",
//     email: "bob.smith@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     email: "charlie.brown@example.com",
//   },
//   {
//     name: "Diana Prince",
//     email: "diana.prince@example.com",
//   },
//   {
//     name: "Ethan Hunt",
//     email: "ethan.hunt@example.com",
//   },
// ];

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "failed to fetch data",
    });
  }
}

export async function GETONE(id: String) {
  try {
    const data = await prisma.user.findFirst({ where: { id: String(id) } });
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "failed to fetch data",
    });
  }
}

export async function POST(body: NewUser) {
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

export async function UpdateUser(req: Request) {
  try {
    const body = await req.json();
    const { id, data } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID is missing",
      });
    }

    await prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.name }),
        ...(data.role !== undefined && { role: data.name }),
      },
    });

    return NextResponse.json({
      success: true,
      message: `User with id${id} successfully updated`,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "failed to update user",
    });
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
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "failed to delete user",
    });
  } finally {
    prisma.$disconnect();
  }
}
