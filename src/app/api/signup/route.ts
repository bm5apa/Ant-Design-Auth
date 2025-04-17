import { NextResponse } from "next/server";
import { users } from "../data/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists",
        },
        { status: 409 }
      );
    }

    const newUser = { username, password };
    users.push(newUser);
    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      message: "Sign-up successful",
      token,
      user: {
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
