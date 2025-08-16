"use client";

import React from "react";
import { Post } from "@/types";
import { VotingSection } from "./VotingSection";
import { PostMetadata, PostTitle, PostContent, PostActions } from "./post";

interface PostCardProps extends Post {}

export default function PostCard({
  id,
  title,
  content,
  summary,
  author,
  upvotes,
  comments,
  timeAgo,
  nominations
}: PostCardProps): React.JSX.Element {
  return (
    <article 
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 p-4 relative" 
      role="article"
    >

      
      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <PostMetadata author={author} timeAgo={timeAgo} variant="card" />
        <PostTitle id={id} title={title} variant="card" />
        <PostContent content={summary} variant="card" />
        <PostActions comments={comments} variant="card" />
      </div>
      <VotingSection upvotes={upvotes} comments={comments} postId={id} showComments={true} allowNomination={false} />
    </article>
  );
}
