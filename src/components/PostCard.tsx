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
      <div className="flex gap-4">
        {/* Voting Section */}
        <VotingSection upvotes={upvotes} />
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <PostMetadata author={author} timeAgo={timeAgo} />
          <PostTitle id={id} title={title} />
          <PostContent content={content} />
          <PostActions comments={comments} nominations={nominations} />
        </div>
      </div>
    </article>
  );
}

// Sub-components for better organization
function VotingSection({ upvotes }: { upvotes: number }) {
  return (
    <div className="flex flex-col items-center gap-1" role="group" aria-label="Röstningssektion">
      <VoteButton 
        direction="up" 
        upvotes={upvotes} 
        className="hover:text-orange-500 focus:ring-orange-500" 
      />
      <span className="text-sm font-medium text-gray-900" aria-live="polite">
        {upvotes}
      </span>
      <VoteButton 
        direction="down" 
        upvotes={upvotes} 
        className="hover:text-blue-500 focus:ring-blue-500" 
      />
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
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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

function PostActions({ comments, nominations }: { comments: number; nominations: number }) {
  const [localIsNominated, setLocalIsNominated] = React.useState(false);

  const handleNomination = () => {
    setLocalIsNominated(!localIsNominated);
    // Här skulle vi normalt anropa en API för att uppdatera nomineringen
    console.log('Nominering toggled for post', !localIsNominated);
  };

  const actions = [
    {
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      label: `${comments} kommentarer`,
      shortLabel: `${comments}`,
      ariaLabel: `${comments} kommentarer. Klicka för att visa kommentarer`,
      onClick: undefined
    },
    {
      icon: "M5 10l7-7m0 0l7 7m-7-7v18",
      label: localIsNominated ? "Nominerad" : "Nominera",
      shortLabel: localIsNominated ? "Nominerad" : "Nominera",
      ariaLabel: localIsNominated ? "Ta bort nominering" : "Nominera detta inlägg som proposition",
      onClick: handleNomination,
      isActive: localIsNominated
    },
    {
      icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
      label: "Spara",
      shortLabel: "Spara",
      ariaLabel: "Spara detta inlägg",
      onClick: undefined
    }
  ];

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500" role="group" aria-label="Inläggsåtgärder">
      {actions.map((action, index) => (
        <ActionButton 
          key={index} 
          icon={action.icon}
          label={action.label}
          shortLabel={action.shortLabel}
          ariaLabel={action.ariaLabel}
          onClick={action.onClick}
          isActive={action.isActive}
        />
      ))}
    </div>
  );
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
  const isNominationButton = icon === "M5 10l7-7m0 0l7 7m-7-7v18";
  
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
        className={`${isNominationButton ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-3 h-3 sm:w-4 sm:h-4'} ${isActive ? 'stroke-2' : 'stroke-1'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 3 : 2} d={icon} />
      </svg>
      <span className="hidden xs:inline">{shortLabel}</span>
      <span className="xs:hidden sm:inline">{label}</span>
    </button>
  );
}
