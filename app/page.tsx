import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authHandler } from "@/auth";

export default async function Home() {
  const session = await authHandler();

  return (
    <main className="flex min-h-screen">
      <h1>
        {session && session.user ? (
          `welcome to the app ${session.user.name}`
        ) : (
          <div>
            <Button asChild>
              <Link href="/middlewareProtected">middleware page</Link>
            </Button>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </h1>
    </main>
  );
}
