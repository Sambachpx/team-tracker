import { authHandler } from "@/auth";

export async function getUserIdFromSession() {
  const session = await authHandler();
  console.log("session", session);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("user not found");
  }

  console.log("user ID:", userId);

  return userId;
}
