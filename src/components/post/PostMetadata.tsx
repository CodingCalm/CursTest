'use client';

import React from 'react';

interface PostMetadataProps {
  author: string;
  timeAgo: string;
  variant?: 'card' | 'detail';
}

export function PostMetadata({
  author,
  timeAgo,
  variant = 'card',
}: PostMetadataProps): React.JSX.Element {
  const isDetail = variant === 'detail';

  return (
    <div
      className={`flex ${isDetail ? 'flex-col xs:flex-row xs:items-center' : 'items-center'} gap-1 ${isDetail ? 'xs:gap-2' : 'gap-2'} text-${isDetail ? 'xs sm:text-sm' : 'sm'} text-gray-500 mb-${isDetail ? '3 sm:mb-4' : '2'}`}
    >
      <span className='whitespace-nowrap'>Postat av u/{author}</span>
      <span
        className={`${isDetail ? 'hidden xs:inline' : ''}`}
        aria-hidden='true'
      >
        •
      </span>
      <time dateTime='2024-01-01' className='whitespace-nowrap'>
        {timeAgo}
      </time>
    </div>
  );
}
