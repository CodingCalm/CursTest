'use client';

import React from 'react';
import { AuthenticatedButton } from '@/components/ui';

interface NominationButtonProps {
  isNominated: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function NominationButton({
  isNominated,
  onToggle,
  disabled = false,
}: NominationButtonProps): React.JSX.Element {
  const buttonClasses = `flex items-center gap-1 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200 ${
    isNominated
      ? 'text-green-600 hover:text-green-700'
      : 'text-gray-500 hover:text-gray-700'
  }`;

  const ariaLabel = isNominated
    ? 'Ta bort nominering'
    : 'Nominera detta inlägg som förslag';

  return (
    <AuthenticatedButton
      className={buttonClasses}
      onAuthenticatedAction={onToggle}
      actionName='nominera'
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <svg
        className={`w-4 h-4 ${isNominated ? 'stroke-2' : 'stroke-1'}`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={isNominated ? 3 : 2}
          d='M5 10l7-7m0 0l7 7m-7-7v18'
        />
      </svg>
      <span className='text-xs'>{isNominated ? 'Nominerad' : 'Nominera'}</span>
    </AuthenticatedButton>
  );
}
