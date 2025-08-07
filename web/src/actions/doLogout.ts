"use server";

import { cookies } from "next/headers";

export async function doLogout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return { status: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { status: false };
  }
}
