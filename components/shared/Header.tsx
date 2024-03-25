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
        label: "Гeнетичний алгоритм",
        href: "/",
        active: pathname === "/",
      },
      {
        label: "Багатокритеріальний аналіз",
        href: "/multicriteria-analisis",
        active: pathname === "/multicriteria-analisis",
      },
      {
        label: "Багатокритеріальний аналіз+",
        href: "/multicriteria-analisis/advanced",
        active: pathname === "/multicriteria-analisis/advanced",
      },
      {
        label: "Домінантний аналіз",
        href: "/multicriteria-analisis/dominance",
        active: pathname === "/multicriteria-analisis/dominance",
      },
      {
        label: "Оцінка ідеї",
        href: "/idea-analisis",
        active: pathname === "/idea-analisis",
      },
      {
        label: "Оцінка ризику",
        href: "/risk-analisis",
        active: pathname === "/risk-analisis",
      },
      {
        label: "Оцінка команди",
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
