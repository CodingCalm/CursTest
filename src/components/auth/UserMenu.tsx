"use client";

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { AccessibleButton } from '@/components/ui/AccessibleButton';

export function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  /**
   * Toggle menu visibility
   */
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Close menu
   */
  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  /**
   * Handle sign out
   */
  const handleSignOut = (): void => {
    signOut({ callbackUrl: '/' });
    closeMenu();
  };

  /**
   * Get user initials for avatar
   */
  const getUserInitials = (session: any): string => {
    return session.user?.name?.charAt(0) || 
           session.user?.email?.charAt(0) || 
           'U';
  };

  /**
   * Get user display name
   */
  const getUserDisplayName = (session: any): string => {
    return session.user?.name || session.user?.email || 'Användare';
  };

  /**
   * Get role display text
   */
  const getRoleDisplayText = (role: string): string => {
    return role === 'admin' ? 'Administratör' : 'Användare';
  };

    // Handle loading state
    if (status === 'loading') {
      return (
        <div className="flex items-center" role="status" aria-label="Laddar användarinformation">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      );
    }

    // Handle unauthenticated state
    if (!session) {
      return (
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="/auth/signin"
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
          >
            Logga in
          </Link>
          <Link
            href="/auth/signup"
            className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-black transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
          >
            Registrera
          </Link>
        </div>
      );
    }

    // Handle authenticated state
    return (
      <div className="relative">
                 <AccessibleButton
           variant="ghost"
           onClick={toggleMenu}
           ariaLabel={`Användarmenyn för ${getUserDisplayName(session)}`}
           ariaExpanded={isMenuOpen}
           ariaControls="user-menu-dropdown"
           className="flex items-center space-x-2"
         >
           <div 
             className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
             aria-hidden="true"
           >
             {getUserInitials(session)}
           </div>
           <span className="hidden sm:block">{getUserDisplayName(session)}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </AccessibleButton>

        {isMenuOpen && (
          <div 
            id="user-menu-dropdown"
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                <div className="font-medium">{session.user?.name}</div>
                <div className="text-gray-500">{session.user?.email}</div>
                                 {session.user?.role && (
                   <div className="text-xs text-gray-400 mt-1">
                     Roll: {getRoleDisplayText(session.user.role)}
                   </div>
                 )}
               </div>
               <Link
                 href="/my-pages"
                 onClick={closeMenu}
                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200"
               >
                 Mina sidor
               </Link>
               <AccessibleButton
                 variant="ghost"
                 onClick={handleSignOut}
                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
                 ariaLabel="Logga ut från kontot"
               >
                 Logga ut
               </AccessibleButton>
             </div>
           </div>
         )}
       </div>
     );
   }
