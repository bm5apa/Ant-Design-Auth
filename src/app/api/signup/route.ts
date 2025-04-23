import { NextResponse } from "next/server";
import { users } from "../data/data";
import bcrypt from "bcrypt";

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

    const alphabetCount = (username.match(/[a-zA-Z]/g) || []).length;
    const numberCount = (username.match(/[0-9]/g) || []).length;
    const passwordAlphabetCount = (password.match(/[a-zA-Z]/g) || []).length;
    const passwordNumberCount = (password.match(/[0-9]/g) || []).length;

    if (
      alphabetCount < 4 ||
      numberCount < 4 ||
      passwordAlphabetCount < 4 ||
      passwordNumberCount < 4
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Username and password must contain at least 4 letters and 4 numbers",
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      resetCode: null,
      resetCodeExpires: null,
    };
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
