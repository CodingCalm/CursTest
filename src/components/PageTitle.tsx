'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function PageTitle(): React.JSX.Element {
  const pathname = usePathname();

  const getPageTitle = (): string | null => {
    // Exkludera create-sidan helt
    if (pathname === '/posts/create') {
      return null;
    }

    if (pathname === '/' || pathname.startsWith('/posts/')) {
      return 'Öppet Samtal';
    } else if (
      pathname === '/propositions' ||
      pathname.startsWith('/propositions/')
    ) {
      return 'Förslag';
    } else if (pathname === '/voting') {
      return 'Votering';
    } else if (pathname === '/auth/signin') {
      return 'Logga in';
    }
    // Returnera null för sidor som redan har tydliga rubriker
    return null;
  };

  const pageTitle = getPageTitle();

  // Visa inte komponenten om det inte finns någon titel
  if (!pageTitle) {
    return null;
  }

  return (
    <div className='md:hidden bg-gray-50 border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-xl font-bold text-gray-900 py-4 text-center'>
          {pageTitle}
        </h1>
      </div>
    </div>
  );
}
