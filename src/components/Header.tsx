"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserMenu } from "./auth/UserMenu";

export default function Header(): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Logo />
            <Navigation className="hidden md:flex" />
          </div>
          
          <div className="flex items-center space-x-4">
            <UserMenu />
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
        
                 {/* Mobile Navigation */}
         {isMobileMenuOpen && (
           <div className="md:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
               <MobileNavigation onNavigate={closeMobileMenu} />
             </div>
           </div>
         )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" aria-label="Gå till öppet samtal">
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

function Navigation({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", label: "Öppet Samtal" },
    { href: "/propositions", label: "Förslag" },
    { href: "/voting", label: "Votering" }
  ];

  return (
    <nav role="navigation" aria-label="Huvudnavigation" className={`flex-shrink-0 ml-4 sm:ml-8 ${className}`}>
      <ul className="flex space-x-2 sm:space-x-4 md:space-x-8">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}

function NavItem({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  // Check if current page matches the navigation item
  const isActive = (() => {
    if (href === "/") {
      // For "Öppet Samtal", match exact path or posts pages
      return pathname === "/" || pathname.startsWith("/posts/");
    } else if (href === "/propositions") {
      // For "Förslag", match exact path or proposition detail pages
      return pathname === "/propositions" || pathname.startsWith("/propositions/");
    } else if (href === "/voting") {
      // For "Votering", match exact path
      return pathname === "/voting";
    }
    return false;
  })();

  // Get color based on navigation item
  const getColorClasses = () => {
    if (href === "/") {
      // Öppet Samtal - black text
      return isActive 
        ? 'text-black font-bold' 
        : 'text-gray-700 hover:text-black font-bold';
    } else if (href === "/propositions") {
      // Förslag - black text
      return isActive 
        ? 'text-black font-bold' 
        : 'text-gray-700 hover:text-black font-bold';
    } else {
      // Votering - black text
      return isActive 
        ? 'text-black font-bold' 
        : 'text-gray-700 hover:text-black font-bold';
    }
  };

  return (
    <li>
      <Link
        href={href}
        className={`px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 whitespace-nowrap ${getColorClasses()}`}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="relative">
          {label}
          {isActive && (
            <div 
              className={`absolute -bottom-2 left-0 right-0 h-1 rounded-full ${
                href === "/" ? "bg-blue-800" : 
                href === "/propositions" ? "bg-green-800" : 
                "bg-purple-800"
              }`}
            />
          )}
        </span>
      </Link>
    </li>
  );
}

function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
      aria-expanded={isOpen}
      aria-label="Öppna navigationsmeny"
    >
      <svg
        className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
}

function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", label: "Öppet Samtal" },
    { href: "/propositions", label: "Förslag" },
    { href: "/voting", label: "Votering" }
  ];

  return (
    <nav role="navigation" aria-label="Mobil navigation">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <MobileNavItem key={item.href} {...item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

function MobileNavItem({ href, label, pathname, onNavigate }: { href: string; label: string; pathname: string; onNavigate: () => void }) {
  const isActive = (() => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/posts/");
    } else if (href === "/propositions") {
      return pathname === "/propositions" || pathname.startsWith("/propositions/");
    } else if (href === "/voting") {
      return pathname === "/voting";
    }
    return false;
  })();

  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 ${
          isActive 
            ? 'text-black bg-gray-100' 
            : 'text-gray-700 hover:text-black hover:bg-gray-50'
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    </li>
  );
}
