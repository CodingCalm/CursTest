"use client";

import React from "react";
import { PostCard } from "@/components";
import { usePosts } from "@/hooks";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

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
      <PostsList posts={posts} />
    </main>
  );
}

function PostsList({ posts }: { posts: any[] }) {
  if (!posts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Inga inlägg att visa</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
