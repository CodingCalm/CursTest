"use client";

import React from "react";
import { PostCard } from "@/components";
import { usePosts } from "@/hooks";
import { SortButton } from "@/components/ui";
import { useSortingStore, useVotingStore } from "@/stores";
import { type Post } from "@/types/post";

export default function MainContent(): React.JSX.Element {
  const { posts, loading, error, refetch } = usePosts();

  if (loading) {
    return (
      <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Laddar inlägg...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={refetch} 
            className="mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Försök igen
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
      <div className="flex justify-end items-center mb-4">
        <SortButton />
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
      <div className="text-center py-8">
        <p className="text-gray-600">Inga inlägg att visa</p>
      </div>
    );
  }

  // Sort posts based on current sort option
  const sortedPosts = [...posts].sort((a, b) => {
    switch (currentSort) {
      case 'newest':
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      case 'oldest':
        return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
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
    <div className="space-y-4" role="feed" aria-label="Lista över populära inlägg">
      {sortedPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
