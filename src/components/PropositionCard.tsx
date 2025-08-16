'use client';

import React from 'react';
import Link from 'next/link';

interface ForslagCardProps {
  id: number;
  title: string;
  introduction: string;
  summary: string;
  background: string;
  arguments: string[];
  conclusion: string;
  originalPostId: number;
}

export function ForslagCard({
  id,
  title,
  summary,
  originalPostId,
}: ForslagCardProps): React.JSX.Element {
  return (
    <article
      className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 p-4 relative'
      role='article'
      aria-labelledby={`forslag-title-${id}`}
    >
      <div className='flex-1 min-w-0'>
        {/* Title */}
        <Link href={`/propositions/${id}`}>
          <h3
            id={`forslag-title-${id}`}
            className='text-lg font-semibold text-green-800 mb-3 hover:text-green-600 transition-colors duration-200 cursor-pointer'
          >
            {title}
          </h3>
        </Link>

        {/* Content Preview */}
        <p className='text-gray-700 leading-relaxed'>{summary}</p>
      </div>
    </article>
  );
}
