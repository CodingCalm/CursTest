'use client';

import React from 'react';
import { ExpandableSection } from '@/components/ui/ExpandableSection';

interface CommentsSectionProps {
  comments: number;
}

export function CommentsSection({
  comments,
}: CommentsSectionProps): React.JSX.Element {
  return (
    <ExpandableSection title='Kommentarer' count={comments}>
      <div className='text-center text-gray-500 py-8'>
        <svg
          className='w-12 h-12 mx-auto mb-4 text-gray-300'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          />
        </svg>
        <p>Kommentarer kommer snart...</p>
      </div>
    </ExpandableSection>
  );
}
