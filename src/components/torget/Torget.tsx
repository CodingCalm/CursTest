"use client";

import React from "react";
import { PostCard } from "@/components";
import { usePosts } from "@/hooks";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { SortButton } from "@/components/ui";
import { useSortingStore, useVotingStore } from "@/stores";
import { type Post } from "@/types/post";

export default function Torget(): React.JSX.Element {
  const { posts, loading, error, refetch } = usePosts();

  if (loading) {
    return (
      <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
        <LoadingSpinner message="Laddar inlägg..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
        <ErrorDisplay 
          message={error} 
          onRetry={refetch}
        />
      </main>
    );
  }

  return (
    <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Torget</h1>
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
    <div className="space-y-4">
      {sortedPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
