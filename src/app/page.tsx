import React from 'react';
import { MainContent } from '@/components';

export default function HomePage(): React.JSX.Element {
  return (
    <div
      className='bg-gray-50 min-h-screen flex justify-center items-center pt-8 pb-8'
      role='region'
      aria-label='Huvudinnehåll'
    >
      <MainContent />
    </div>
  );
}
