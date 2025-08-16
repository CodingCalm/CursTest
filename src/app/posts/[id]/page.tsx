"use client";

import React from "react";
import { notFound } from "next/navigation";
import { Post } from "@/types";
import Link from "next/link";
import { VotingSection } from "@/components/VotingSection";
import { PostMetadata, PostTitle, PostContent as PostContentComponent, PostActions, RelatedPropositions, CommentsSection } from "@/components/post";
import { usePost } from "@/hooks";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps): React.JSX.Element {
  const resolvedParams = React.use(params);
  const postId = parseInt(resolvedParams.id);
  
  if (isNaN(postId)) {
    notFound();
  }
  
  const { post, loading, error } = usePost(postId);
  
  if (!post && !loading) {
    notFound();
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8">
        <div className="w-full max-w-2xl px-4">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Laddar inlägg...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8">
        <div className="w-full max-w-2xl px-4">
          <div className="text-center py-8">
            <p className="text-red-600">{error || 'Inlägg hittades inte'}</p>
            <Link 
              href="/" 
              className="mt-2 inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8">
      <div className="w-full max-w-2xl px-4">
        <BackButton />
        <PostDetail post={post} />
        <RelatedPropositions postId={post.id} />
        <CommentsSection comments={post.comments} />
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <div className="mb-6">
      <Link 
        href="/" 
        className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka till startsidan
      </Link>
    </div>
  );
}

function PostDetail({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-lg shadow-lg p-4 sm:p-6" role="article">
      <PostContent post={post} />
      <VotingSection upvotes={post.upvotes} comments={post.comments} postId={post.id} showComments={false} />
    </article>
  );
}

function PostContent({ post }: { post: Post }) {
  return (
    <div className="flex-1 min-w-0">
      <PostMetadata author={post.author} timeAgo={post.timeAgo} variant="detail" />
      <PostTitle title={post.title} variant="detail" />
      <PostContentComponent content={post.content} variant="detail" />
      <PostActions variant="detail" />
    </div>
  );
}
