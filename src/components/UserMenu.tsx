"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/auth/signin"
          className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
        >
          Logga in
        </Link>
        <Link
          href="/auth/signup"
          className="text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
        >
          Registrera
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
      >
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
           {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
         </div>
         <span className="hidden sm:block">{user.name || user.email}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
                         <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
               <div className="font-medium">{user.name}</div>
               <div className="text-gray-500">{user.email}</div>
               {user.role && (
                 <div className="text-xs text-gray-400 mt-1">
                   Roll: {user.role === 'admin' ? 'Administratör' : 'Användare'}
                 </div>
               )}
             </div>
            <button
                             onClick={() => {
                 logout();
                 setIsMenuOpen(false);
               }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-200"
            >
              Logga ut
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
