import React from "react";
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
    <div className="flex-shrink-0 ml-0">
      <a href="/" className="flex items-center" aria-label="Gå till öppet samtal">
        <Image
          src="/images/arete-logo.png"
          alt="Arete Logo"
          width={240}
          height={64}
          className="h-12 sm:h-16 w-auto"
          priority
        />
      </a>
    </div>
  );
}

function Navigation() {
  const navItems = [
    { href: "/", label: "Öppet samtal" },
    { href: "/propositions", label: "Propositioner" },
    { href: "/voting", label: "Votering" }
  ];

  return (
    <nav role="navigation" aria-label="Huvudnavigation" className="ml-8">
      <ul className="flex space-x-8">
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
      <a
        href={href}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        aria-current={href === "/" ? "page" : undefined}
      >
        {label}
      </a>
    </li>
  );
}
