import React from 'react';

export default function SkipLink(): React.JSX.Element {
  return (
    <a
      href='#main-content'
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gray-800 text-white px-4 py-2 rounded z-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2'
      aria-label='Hoppa till huvudinnehåll'
    >
      Hoppa till huvudinnehåll
    </a>
  );
}
