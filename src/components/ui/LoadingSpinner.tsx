import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({
  message = 'Laddar...',
  size = 'md',
  className = '',
}: LoadingSpinnerProps): React.JSX.Element {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-gray-900 mx-auto ${sizeClasses[size]}`}
        role='status'
        aria-label='Laddar innehåll'
      />
      <p className='mt-2 text-gray-600'>{message}</p>
    </div>
  );
}
