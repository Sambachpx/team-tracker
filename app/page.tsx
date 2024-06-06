import { authHandler } from "@/auth";
import LinkButton from "@/components/LinkButton";

export default async function Home() {
  const session = await authHandler();

  return (
    <main className="flex min-h-screen">
      <h1>
        {session && session.user ? (
          <>
            {`welcome to Team-tracker ${session.user.name}`}
            <LinkButton href="/player">create a player</LinkButton>
            <LinkButton href="/team">create a team</LinkButton>
            <LinkButton href="/player">view my players & teams</LinkButton>
          </>
        ) : (
          <div>
            <LinkButton href="/">Home</LinkButton>
            <LinkButton href="/login">Login</LinkButton>
            <LinkButton href="/register">Register</LinkButton>
          </div>
        )}
      </h1>
    </main>
  );
}
