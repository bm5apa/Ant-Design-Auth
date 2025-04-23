import { NextResponse } from "next/server";
import { users } from "../data/data";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { username, newPassword, resetCode } = await request.json();
    const user = users.find(
      (u) => u.username === username && u.resetCode === resetCode
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or reset code" },
        { status: 401 }
      );
    }
    if (user.resetCodeExpires && user.resetCodeExpires < new Date()) {
      user.resetCode = null;
      user.resetCodeExpires = null;
      return NextResponse.json(
        { success: false, message: "Reset code has expired" },
        { status: 401 }
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpires = null;
    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
