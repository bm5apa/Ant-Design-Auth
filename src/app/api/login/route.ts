import { NextResponse } from "next/server";

const users = [
  {
    username: "admin",
    password: "admin123",
  },
  {
    username: "user",
    password: "user123",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");
      return NextResponse.json({
        success: true,
        message: "Login Successfully!",
        token,
        user: {
          username: user.username,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Username or Password is Wrong.",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
