import React from 'react';

/**
 * Sidebar component
 * @description Sidebar with navigation links
 */
export default function Sidebar(): React.JSX.Element {
  return (
    <aside
      className='
        w-48 sm:w-64 
        border-2 border-purple-500 p-2 sm:p-4 bg-purple-50
        hidden sm:block
      '
      role='complementary'
      aria-label='Sidopanel'
    >
      <h2 className='text-base sm:text-lg font-semibold text-purple-800 mb-2 sm:mb-4'>
        Sidebar
      </h2>
      <p className='text-sm sm:text-base text-purple-700'>
        Detta är sidopanelen.
      </p>
      <nav className='mt-4' aria-label='Sidopanel navigation'>
        <ul className='space-y-2'>
          <li>
            <a
              href='#'
              className='block text-purple-700 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1'
            >
              Länk 1
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block text-purple-700 hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1'
            >
              Länk 2
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
