import Link from "next/link";
import { Button } from "./ui/Button";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <Button asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
