import React from "react";
import { PostCard } from "@/components";
import { mockPosts } from "@/data";

export default function MainContent(): React.JSX.Element {
  return (
    <main className="w-full max-w-2xl space-y-4 px-4" role="main" id="main-content">
      <div className="space-y-4" role="feed" aria-label="Lista över populära inlägg">
        {mockPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </main>
  );
}
