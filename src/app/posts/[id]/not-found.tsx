import React from 'react';
import Link from 'next/link';

export default function NotFound(): React.JSX.Element {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
      <div className='max-w-md mx-auto text-center px-4'>
        <NotFoundContent />
      </div>
    </div>
  );
}

function NotFoundContent() {
  return (
    <>
      <NotFoundIcon />
      <NotFoundText />
      <BackToHomeButton />
    </>
  );
}

function NotFoundIcon() {
  return (
    <div className='mb-8'>
      <svg
        className='w-24 h-24 mx-auto text-gray-300 mb-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33'
        />
      </svg>
    </div>
  );
}

function NotFoundText() {
  return (
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
        Post hittades inte
      </h1>
      <p className='text-gray-600'>
        Den post du letar efter finns inte eller har tagits bort.
      </p>
    </div>
  );
}

function BackToHomeButton() {
  return (
    <Link
      href='/'
      className='inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200'
    >
      <svg
        className='w-4 h-4 mr-2'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
      Gå till startsidan
    </Link>
  );
}
