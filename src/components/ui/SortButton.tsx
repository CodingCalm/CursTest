'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSortingStore, type SortOption } from '@/stores/sortingStore';

export function SortButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentSort, setSort, getSortLabel } = useSortingStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const sortOptions: SortOption[] = [
    'newest',
    'oldest',
    'mostUpvotes',
    'leastUpvotes',
    'mostComments',
  ];

  const handleSortChange = (sort: SortOption) => {
    setSort(sort);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = sortOptions.indexOf(currentSort);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        setSort(sortOptions[nextIndex]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex =
          currentIndex === 0 ? sortOptions.length - 1 : currentIndex - 1;
        setSort(sortOptions[prevIndex]);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        listboxRef.current &&
        !listboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={`Sortera efter: ${getSortLabel(currentSort)}`}
      >
        <svg
          className='w-4 h-4 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
          />
        </svg>
        <span className='text-sm font-medium text-gray-700'>
          {getSortLabel(currentSort)}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className='absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10'
          role='presentation'
        >
          <ul
            ref={listboxRef}
            className='py-1'
            role='listbox'
            aria-label='Sorteringsalternativ'
            onKeyDown={handleListboxKeyDown}
            tabIndex={-1}
          >
            {sortOptions.map(option => (
              <li key={option} role='none'>
                <button
                  onClick={() => handleSortChange(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200 ${
                    currentSort === option
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-700'
                  }`}
                  role='option'
                  aria-selected={currentSort === option}
                >
                  {getSortLabel(option)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
