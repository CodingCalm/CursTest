'use client';

import React from 'react';

interface PostContentProps {
  content: string;
  variant?: 'card' | 'detail';
}

export function PostContent({
  content,
  variant = 'card',
}: PostContentProps): React.JSX.Element {
  const isDetail = variant === 'detail';

  if (isDetail) {
    return (
      <div className='prose prose-sm sm:prose-lg max-w-none mb-6'>
        <p className='text-gray-700 leading-relaxed text-sm sm:text-base'>
          {content}
        </p>
      </div>
    );
  }

  return <p className='text-gray-700 mb-4 line-clamp-3'>{content}</p>;
}
