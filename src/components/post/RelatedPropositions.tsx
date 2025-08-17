'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExpandableSection, LoadingSpinner } from '@/components/ui';
import { Forslag } from '@/types/post';

interface RelatedPropositionsProps {
  postId: number;
}

export function RelatedPropositions({
  postId,
}: RelatedPropositionsProps): React.JSX.Element {
  const [relatedPropositions, setRelatedPropositions] = useState<Forslag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedPropositions = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Fetching related propositions for post:', postId);

        const response = await fetch(`/api/forslag?postId=${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch related propositions');
        }

        const data = await response.json();
        const forslag = data.forslag || [];

        console.log('📊 Fetched related propositions:', forslag.length);

        setRelatedPropositions(forslag);
      } catch (err) {
        setError('Kunde inte ladda relaterade förslag');
        console.error('Error loading related propositions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPropositions();
  }, [postId]);

  if (loading) {
    return (
      <ExpandableSection title='Relaterade förslag' count={0}>
        <div className='flex justify-center py-4'>
          <LoadingSpinner message='Laddar förslag...' />
        </div>
      </ExpandableSection>
    );
  }

  if (error) {
    return (
      <ExpandableSection title='Relaterade förslag' count={0}>
        <div className='text-center py-4 text-red-600'>
          <p>{error}</p>
        </div>
      </ExpandableSection>
    );
  }

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
  proposition: Forslag;
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
