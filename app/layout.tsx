import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "team-tracker",
  description: "a football player management game",
};

interface PropsRootLayout {
  children: React.ReactNode;
  session: Session | null;
}

export default function RootLayout({ children, session }: PropsRootLayout) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
