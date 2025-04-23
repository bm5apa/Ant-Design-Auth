import bcrypt from "bcrypt";

const hashedAdminPassword = bcrypt.hashSync("admin1111", 10);
const hashedUserPassword = bcrypt.hashSync("user1111", 10);

export const users: {
  username: string;
  password: string;
  resetCode: string | null;
  resetCodeExpires?: Date | null;
}[] = [
  {
    username: "admin1234",
    password: hashedAdminPassword,
    resetCode: "ABC123",
    resetCodeExpires: new Date(Date.now() + 1000 * 60 * 60),
  },
  {
    username: "user1234",
    password: hashedUserPassword,
    resetCode: null,
    resetCodeExpires: null,
  },
];
