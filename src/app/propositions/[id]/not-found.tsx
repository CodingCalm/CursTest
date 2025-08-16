import React from 'react';
import Link from 'next/link';

export default function PropositionNotFound(): React.JSX.Element {
  return (
    <div className='bg-gray-50 flex justify-center items-center pt-8 pb-8'>
      <div className='w-full max-w-2xl px-4'>
        <div className='text-center py-8'>
          <div className='text-6xl mb-4'>📋</div>
          <h1 className='text-2xl font-semibold text-gray-900 mb-4'>
            Förslag hittades inte
          </h1>
          <p className='text-gray-600 mb-6'>
            Det förslag du letar efter finns inte eller har tagits bort.
          </p>
          <Link
            href='/propositions'
            className='inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors duration-200'
          >
            Tillbaka till förslag
          </Link>
        </div>
      </div>
    </div>
  );
}
