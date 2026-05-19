import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "./constants";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "authenticated";
}

export { ADMIN_COOKIE };
