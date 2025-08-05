import { Role } from "../generated/prisma"; // pastikan path-nya sesuai

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  referredReferralCode?: string;
  role: Role; // ubah dari string jadi Role
}
