'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LoginPromptProps {
  isOpen: boolean;
  onClose: () => void;
  action: 'rösta' | 'nominera';
}

export function LoginPrompt({
  isOpen,
  onClose,
  action,
}: LoginPromptProps): React.JSX.Element {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Inloggning krävs
        </h3>
        <p className='text-gray-600 mb-6'>
          Du måste vara inloggad för att {action}.
        </p>
        <div className='flex gap-3'>
          <Link
            href='/auth/signin'
            className='flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 text-center'
          >
            Logga in
          </Link>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50'
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}
