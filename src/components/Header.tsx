import React from "react";

export default function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <nav role="navigation" aria-label="Huvudnavigation">
            <ul className="flex items-center space-x-8">
              <li>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
                  aria-current="page"
                >
                  Hem
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Om oss
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
