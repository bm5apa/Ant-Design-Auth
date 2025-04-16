import { NextResponse } from "next/server";

// 模拟用户数据库
const users = [
  {
    username: "admin",
    password: "admin123", // 实际应用中应该使用加密密码
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

    // 验证用户名和密码
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // 登录成功，生成一个简单的 token（实际应用中应该使用 JWT）
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

      return NextResponse.json({
        success: true,
        message: "登录成功",
        token,
        user: {
          username: user.username,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "用户名或密码错误",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "服务器错误",
      },
      { status: 500 }
    );
  }
}
