"use client";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {};

const Header = (props: Props) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        title: "Впровадження та супровід",
        active: pathname === "/",
        links: [
          {
            label: "Гeнетичний алгоритм",
            href: "/",
            active: pathname === "/",
          }
        ]
      },
      {
        title: "Підтримка прийняття рішень",
        active: pathname === "/multicriteria-analisis" || pathname === "/multicriteria-analisis/advanced" || pathname === "/dominance" || pathname === "/dominance/advanced",
        links: [
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
            href: "/dominance",
            active: pathname === "/dominance",
          },
          {
            label: "Домінантний аналіз+",
            href: "/dominance/advanced",
            active: pathname === "/dominance/advanced",
          }
        ],
      },

      {
        title: "Оцінка стартапу",
        active: pathname === "/idea-analisis" || pathname === "/risk-analisis" || pathname === "/team-analisis",
        links: [
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
          }
        ]
      }



    ],
    [pathname]
  );

  return (
    <header className=" border-b p-4">
      <nav className=" flex  justify-around">

        {routes.map((route) => (
          <DropdownMenu>
            <DropdownMenuTrigger className={cn("hover:text-blue-600 font-medium", route.active && "underline text-blue-600 font-semibold")}>{route.title}</DropdownMenuTrigger>
            <DropdownMenuContent>
              {route.links.map((item) => (
                <DropdownMenuItem>
                  <Button
                    className={`${item.active && "underline font-bold text-blue-600"
                      } transition`}
                    key={item.label}
                    variant="link"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </DropdownMenuItem>

              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>
    </header>
  );
};

export default Header;
