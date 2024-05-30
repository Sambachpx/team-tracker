"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen">
      <h1> {session?.user?.email ? `Authentificated ${session.user.email}` : "Not Authentificated"}</h1>
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Register</Link>
      </Button>
    </main>
  );
}
