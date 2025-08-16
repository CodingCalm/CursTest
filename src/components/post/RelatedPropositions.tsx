'use client';

import React from 'react';
import Link from 'next/link';
import { ExpandableSection } from '@/components/ui/ExpandableSection';
import { mockForslag } from '@/data';

interface RelatedPropositionsProps {
  postId: number;
}

export function RelatedPropositions({
  postId,
}: RelatedPropositionsProps): React.JSX.Element {
  const relatedPropositions = mockForslag.filter(
    forslag => forslag.originalPostId === postId
  );

  if (relatedPropositions.length === 0) {
    return <></>;
  }

  return (
    <ExpandableSection
      title='Relaterade förslag'
      count={relatedPropositions.length}
    >
      <div className='space-y-3'>
        {relatedPropositions.map(proposition => (
          <RelatedPropositionCard
            key={proposition.id}
            proposition={proposition}
          />
        ))}
      </div>
    </ExpandableSection>
  );
}

function RelatedPropositionCard({
  proposition,
}: {
  proposition: any;
}): React.JSX.Element {
  return (
    <Link
      href={`/propositions/${proposition.id}`}
      className='block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-opacity-50 relative'
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-base font-semibold text-green-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors duration-200'>
            {proposition.title}
          </h3>
          <p className='text-sm text-gray-600 line-clamp-3'>
            {proposition.summary}
          </p>
        </div>
        <svg
          className='w-4 h-4 text-gray-400 ml-2 flex-shrink-0 mt-1'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </div>
    </Link>
  );
}
