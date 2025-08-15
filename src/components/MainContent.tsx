"use client";

import React from "react";
import { PostCard } from "@/components";
import { usePosts } from "@/hooks";

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
            className="mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Försök igen
          </button>
        </div>
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
  return (
    <div className="space-y-4" role="feed" aria-label="Lista över populära inlägg">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
