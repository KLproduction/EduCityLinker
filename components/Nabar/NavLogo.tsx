"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLogo = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <div>
      <h2
        className={cn(
          "text-6xl font-bold",
          !isMainPage ? "text-rose-500" : "text-transparent",
        )}
      >
        <Link href="/">AMIO</Link>
      </h2>
    </div>
  );
};

export default NavLogo;
