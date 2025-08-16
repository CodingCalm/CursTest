import React from 'react';

export default function VotingPage(): React.JSX.Element {
  return (
    <div
      className='bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8'
      role='region'
      aria-label='Huvudinnehåll'
    >
      <div className='w-full max-w-4xl px-4'>
        <PageHeader />
        <ContentPlaceholder />
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className='text-center mb-12'>
      <h1 className='text-4xl sm:text-5xl font-bold text-gray-900 mb-6'>
        Votering
      </h1>
      <p className='text-xl text-gray-600'>
        Rösta på aktiva förslag och förslag
      </p>
    </div>
  );
}

function ContentPlaceholder() {
  return (
    <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
      <div className='text-6xl mb-4'>🗳️</div>
      <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
        Votering kommer snart
      </h2>
      <p className='text-gray-600'>
        Denna sektion kommer att innehålla aktiva omröstningar där användare kan
        rösta på olika förslag.
      </p>
    </div>
  );
}
