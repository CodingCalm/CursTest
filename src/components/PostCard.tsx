"use client";

import React from "react";
import { Post } from "@/types";
import Link from "next/link";

interface PostCardProps extends Post {}

export default function PostCard({
  id,
  title,
  content,
  author,
  upvotes,
  comments,
  timeAgo,
  nominations
}: PostCardProps): React.JSX.Element {
  return (
    <article 
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 p-4" 
      role="article"
    >
      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <PostMetadata author={author} timeAgo={timeAgo} />
        <PostTitle id={id} title={title} />
        <PostContent content={content} />
        <PostActions comments={comments} />
      </div>
      <VotingSection upvotes={upvotes} nominations={nominations} comments={comments} />
    </article>
  );
}

// Sub-components for better organization
function VotingSection({ upvotes, nominations, comments }: { upvotes: number; nominations: number; comments: number }) {
  const [localIsNominated, setLocalIsNominated] = React.useState(false);

  const handleNomination = () => {
    setLocalIsNominated(!localIsNominated);
    console.log('Nominering toggled for post', !localIsNominated);
  };

  return (
    <div className="flex flex-row items-center justify-between mt-4 pt-4 border-t border-gray-200" role="group" aria-label="Röstningssektion">
      <div className="flex items-center gap-2">
        <VoteButton 
          direction="up" 
          upvotes={upvotes} 
          className="hover:text-orange-500 focus:ring-orange-500" 
        />
        <span className="text-sm font-bold text-gray-900 mx-2" aria-live="polite">
          {upvotes}
        </span>
        <VoteButton 
          direction="down" 
          upvotes={upvotes} 
          className="hover:text-blue-500 focus:ring-blue-500" 
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs">{comments}</span>
        </div>
        <button 
          className={`flex items-center gap-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 ${
            localIsNominated 
              ? 'text-green-600 hover:text-green-700' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label={localIsNominated ? "Ta bort nominering" : "Nominera detta inlägg som proposition"}
          onClick={handleNomination}
        >
          <svg 
            className={`w-4 h-4 ${localIsNominated ? 'stroke-2' : 'stroke-1'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={localIsNominated ? 3 : 2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-xs">{localIsNominated ? "Nominerad" : "Nominera"}</span>
        </button>
      </div>
    </div>
  );
}

function VoteButton({ 
  direction, 
  upvotes, 
  className 
}: { 
  direction: 'up' | 'down'; 
  upvotes: number; 
  className: string; 
}) {
  const isUpvote = direction === 'up';
  const iconPath = isUpvote 
    ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
    : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z";

  return (
    <button 
      className={`text-gray-400 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${className}`}
      aria-label={`Rösta ${isUpvote ? 'upp' : 'ner'}. Just nu ${upvotes} röster`}
      aria-pressed="false"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
      </svg>
    </button>
  );
}

function PostMetadata({ author, timeAgo }: { author: string; timeAgo: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
      <span>Postat av u/{author}</span>
      <span aria-hidden="true">•</span>
      <time dateTime="2024-01-01">{timeAgo}</time>
    </div>
  );
}

function PostTitle({ id, title }: { id: number; title: string }) {
  return (
    <Link href={`/posts/${id}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded transition-all duration-200">
        {title}
      </h3>
    </Link>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <p className="text-gray-700 mb-4 line-clamp-3">
      {content}
    </p>
  );
}

function PostActions({ comments }: { comments: number }) {
  return null;
}

function ActionButton({ 
  icon, 
  label, 
  shortLabel,
  ariaLabel,
  onClick,
  isActive
}: { 
  icon: string; 
  label: string; 
  shortLabel: string;
  ariaLabel: string; 
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <button 
      className={`flex items-center gap-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex-shrink-0 ${
        isActive 
          ? 'text-green-600 hover:text-green-700' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg 
        className="w-3 h-3 sm:w-4 sm:h-4 stroke-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="hidden xs:inline">{shortLabel}</span>
      <span className="xs:hidden sm:inline">{label}</span>
    </button>
  );
}
