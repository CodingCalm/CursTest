'use client';

import React, { useMemo } from 'react';
import { PostCard } from '@/components';
import { useSortingStore, useVotingStore } from '@/stores';
import { type Post } from '@/types/post';

export function PostsList({ posts }: { posts: Post[] }) {
  const { currentSort } = useSortingStore();
  const { getUpvotes } = useVotingStore();

  // Memoize sorted posts to avoid unnecessary re-sorting
  const sortedPosts = useMemo(() => {
    if (!posts.length) return [];

    return [...posts].sort((a, b) => {
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
  }, [posts, currentSort, getUpvotes]);

  if (!posts.length) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-600'>Inga inlägg att visa</p>
      </div>
    );
  }

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
