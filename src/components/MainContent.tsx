'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PostCard } from '@/components';
import { usePosts } from '@/hooks';
import { SortButton } from '@/components/ui';
import { useSortingStore, useVotingStore } from '@/stores';
import { type Post } from '@/types/post';

export default function MainContent(): React.JSX.Element {
  const { posts, loading, error, refetch } = usePosts();
  const { data: session, status } = useSession();

  if (loading) {
    return (
      <main
        className='w-full max-w-2xl space-y-4 px-4'
        role='main'
        id='main-content'
      >
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-2 text-gray-600'>Laddar inlägg...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className='w-full max-w-2xl space-y-4 px-4'
        role='main'
        id='main-content'
      >
        <div className='text-center py-8'>
          <p className='text-red-600'>{error}</p>
          <button
            onClick={refetch}
            className='mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'
          >
            Försök igen
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className='w-full max-w-2xl space-y-2 px-4'
      role='main'
      id='main-content'
    >
      <div className='flex justify-end items-center mb-2'>
        <div className='flex items-center space-x-3'>
          {session ? (
            <Link
              href='/posts/create'
              className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200'
              aria-label='Skapa nytt inlägg'
            >
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
              <span className='text-sm font-medium text-gray-900'>
                Skapa inlägg
              </span>
            </Link>
          ) : (
            <Link
              href='/auth/signin'
              className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200'
              aria-label='Logga in för att skapa inlägg'
            >
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                />
              </svg>
              <span className='text-sm font-medium text-gray-900'>
                Logga in för att skapa inlägg
              </span>
            </Link>
          )}

          <SortButton />
        </div>
      </div>
      <PostsList posts={posts} />
    </main>
  );
}

function PostsList({ posts }: { posts: Post[] }) {
  const { currentSort } = useSortingStore();
  const { getUpvotes } = useVotingStore();

  if (!posts.length) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-600'>Inga inlägg att visa</p>
      </div>
    );
  }

  // Sort posts based on current sort option
  const sortedPosts = [...posts].sort((a, b) => {
    switch (currentSort) {
      case 'newest':
        return (
          new Date(b.created_at || '').getTime() -
          new Date(a.created_at || '').getTime()
        );
      case 'oldest':
        return (
          new Date(a.created_at || '').getTime() -
          new Date(b.created_at || '').getTime()
        );
      case 'mostUpvotes':
        return getUpvotes(b.id) - getUpvotes(a.id);
      case 'leastUpvotes':
        return getUpvotes(a.id) - getUpvotes(b.id);
      case 'mostComments':
        return (b.comments || 0) - (a.comments || 0);
      default:
        return 0;
    }
  });

  return (
    <div
      className='space-y-4'
      role='feed'
      aria-label='Lista över populära inlägg'
    >
      {sortedPosts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
