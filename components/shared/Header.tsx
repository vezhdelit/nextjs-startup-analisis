"use client";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        label: "StartUp Analisis",
        href: "/",
        active: pathname === "/",
      },
      {
        label: "Risk Analisis",
        href: "/risk-analisis",
        active: pathname === "/risk-analisis",
      },
      {
        label: "Team Analisis",
        href: "/team-analisis",
        active: pathname === "/team-analisis",
      },
    ],
    [pathname]
  );

  return (
    <header className=" border-b p-4">
      <nav className=" flex  justify-between">
        {routes.map((item) => (
          <Button
            className={`${
              item.active && "underline font-bold text-blue-600"
            } transition`}
            key={item.label}
            variant="link"
            asChild
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
