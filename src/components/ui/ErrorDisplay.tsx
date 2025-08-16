import React from 'react';
import Link from 'next/link';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  className?: string;
}

export function ErrorDisplay({
  message,
  onRetry,
  showBackButton = false,
  backHref = '/',
  backText = 'Tillbaka till startsidan',
  className = '',
}: ErrorDisplayProps): React.JSX.Element {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className='text-6xl mb-4'>⚠️</div>
      <p className='text-red-600 mb-4'>{message}</p>

      <div className='flex flex-col sm:flex-row gap-3 justify-center'>
        {onRetry && (
          <button
            onClick={onRetry}
            className='px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50'
            aria-label='Försök igen'
          >
            Försök igen
          </button>
        )}

        {showBackButton && (
          <Link
            href={backHref}
            className='px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50'
          >
            {backText}
          </Link>
        )}
      </div>
    </div>
  );
}
