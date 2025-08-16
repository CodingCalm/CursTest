'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockForslag } from '@/data';
import { type Forslag } from '@/types/post';
import { PostCard } from '@/components';
import { VotingBar } from '@/components/ui';
import { usePosts } from '@/hooks';

interface ForslagPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ForslagPage({
  params,
}: ForslagPageProps): React.JSX.Element {
  const resolvedParams = React.use(params);
  const forslagId = parseInt(resolvedParams.id);

  if (isNaN(forslagId)) {
    notFound();
  }

  const forslag = mockForslag.find(p => p.id === forslagId);

  if (!forslag) {
    notFound();
  }

  return (
    <div className='bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8'>
      <div className='w-full max-w-2xl px-4'>
        <BackButton />
        <ForslagDetail forslag={forslag} />
        <RelatedDiscussionsSection originalPostId={forslag.originalPostId} />
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <div className='mb-6'>
      <Link
        href='/propositions'
        className='inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200'
      >
        <svg
          className='w-4 h-4 mr-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
          />
        </svg>
        Tillbaka till förslag
      </Link>
    </div>
  );
}

function ForslagDetail({ forslag }: { forslag: Forslag }) {
  return (
    <article
      className='bg-white rounded-lg shadow-lg p-4 sm:p-6'
      role='article'
    >
      <div className='flex-1 min-w-0'>
        {/* Title */}
        <h1 className='text-2xl sm:text-3xl font-bold text-green-800 mb-6'>
          {forslag.title}
        </h1>

        {/* Content Sections */}
        <div className='space-y-6'>
          {/* Introduction */}
          <section>
            <p className='text-gray-700 leading-relaxed text-base sm:text-lg'>
              {forslag.introduction}
            </p>
          </section>

          {/* Background */}
          <section>
            <h2 className='text-lg font-semibold text-gray-900 mb-3'>
              Bakgrund
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {forslag.background}
            </p>
          </section>

          {/* Arguments */}
          <section>
            <h2 className='text-lg font-semibold text-gray-900 mb-3'>
              Viktiga anledningar
            </h2>
            <ul className='space-y-3'>
              {forslag.arguments.map((argument, index) => (
                <li key={index} className='flex items-start'>
                  <span className='text-blue-600 mr-2 mt-1'>●</span>
                  <span className='text-gray-700 leading-relaxed'>
                    {argument}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className='text-lg font-semibold text-gray-900 mb-3'>
              Förslag
            </h2>
            <p className='text-gray-700 leading-relaxed'>
              {forslag.conclusion}
            </p>
          </section>
        </div>

        {/* Action Section */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Vad händer härnäst?
          </h3>
          <p className='text-gray-600 mb-6'>
            Detta medborgarförslag kommer att granskas av experter och
            beslutsfattare. Baserat på feedback och ytterligare analys kan det
            utvecklas vidare eller implementeras som policy.
          </p>

          {/* Separator line */}
          <div className='border-t border-gray-200 mb-6'></div>

          {/* Voting Bar - integrated into the main card */}
          <VotingBar
            upvotes={15}
            downvotes={8}
            className='border-0 shadow-none bg-transparent'
          />
        </div>
      </div>
    </article>
  );
}

function RelatedDiscussionsSection({
  originalPostId,
}: {
  originalPostId: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { posts, loading } = usePosts();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Find the original post
  const originalPost = posts?.find(post => post.id === originalPostId);

  return (
    <div className='mt-6'>
      <button
        onClick={toggleExpanded}
        className='w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 hover:bg-gray-50'
        aria-expanded={isExpanded}
        aria-controls='related-discussions-content'
      >
        <span className='text-lg font-semibold text-gray-900'>
          Relaterade diskussioner
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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

      <div
        id='related-discussions-content'
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='mt-4'>
          {loading ? (
            <div className='text-center py-4'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto'></div>
              <p className='mt-2 text-sm text-gray-600'>
                Laddar diskussioner...
              </p>
            </div>
          ) : originalPost ? (
            <PostCard {...originalPost} />
          ) : (
            <div className='text-center py-4'>
              <p className='text-gray-600'>Ingen relaterad diskussion hittad</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
