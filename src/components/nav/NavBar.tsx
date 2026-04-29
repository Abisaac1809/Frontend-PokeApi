"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/pokemon", label: "Pokémon" },
  { href: "/pokemon-types", label: "Tipos" },
  { href: "/habitat", label: "Hábitats" },
  { href: "/items", label: "Objetos" },
  { href: "/moves", label: "Movimientos" },
  { href: "/locations", label: "Ubicaciones" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-base/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight text-text-primary group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="32"
            height="32"
            aria-label="Pokébola"
            className="transition-transform duration-500 group-hover:rotate-180 flex-shrink-0"
          >
            <path
              d="M 50 5 A 45 45 0 0 1 95 50 L 50 50 Z"
              fill="#e3350d"
            />
            <path
              d="M 50 5 A 45 45 0 0 0 5 50 L 50 50 Z"
              fill="#e3350d"
            />
            <path
              d="M 5 50 A 45 45 0 0 0 95 50 L 50 50 Z"
              fill="#f5f5f5"
            />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="4" />
            <rect x="5" y="46" width="90" height="8" fill="#222" />
            <circle cx="50" cy="50" r="12" fill="#222" />
            <circle cx="50" cy="50" r="8" fill="#f5f5f5" />
            <circle cx="47" cy="47" r="2.5" fill="white" opacity="0.6" />
          </svg><span>Poké<span className="text-accent">dex</span></span>
        </Link>
        <ul className="flex flex-wrap items-center gap-4 text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative font-heading font-medium transition-colors ${isActive
                      ? "text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:rounded-full after:bg-accent"
                      : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
