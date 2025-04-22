import { NextResponse } from "next/server";
import { users } from "../data/data";

export async function POST(request: Request) {
  const { username, newPassword, resetCode } = await request.json();
  const user = users.find(
    (u) => u.username === username && u.resetCode === resetCode
  );
  if (user) {
    user.password = newPassword;
    user.resetCode = null;
    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  }
  return NextResponse.json(
    { success: false, message: "Invalid username or reset code" },
    { status: 401 }
  );
}
