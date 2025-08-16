"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header(): React.JSX.Element {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20">
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="flex items-center" aria-label="Gå till torget">
        <Image
          src="/images/arete-logo.png"
          alt="Arete Logo"
          width={240}
          height={64}
          className="h-10 sm:h-12 md:h-16 w-auto"
          priority
        />
      </Link>
    </div>
  );
}

function Navigation() {
  const navItems = [
    { href: "/", label: "Torget" },
    { href: "/propositions", label: "Förslag" },
    { href: "/voting", label: "Votering" }
  ];

  return (
    <nav role="navigation" aria-label="Huvudnavigation" className="flex-shrink-0 ml-4 sm:ml-8">
      <ul className="flex space-x-2 sm:space-x-4 md:space-x-8">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-700 hover:text-gray-900 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 whitespace-nowrap"
        aria-current={href === "/" ? "page" : undefined}
      >
        {label}
      </Link>
    </li>
  );
}
