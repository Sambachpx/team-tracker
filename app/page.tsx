import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </main>
  );
}
