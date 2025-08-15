"use client";

import React from "react";
import { notFound } from "next/navigation";
import { postService } from "@/services";
import { Post } from "@/types";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps): React.JSX.Element {
  const resolvedParams = React.use(params);
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const postId = parseInt(resolvedParams.id);
        if (isNaN(postId)) {
          notFound();
          return;
        }
        
        const fetchedPost = await postService.getPostById(postId);
        if (!fetchedPost) {
          notFound();
          return;
        }
        
        setPost(fetchedPost);
      } catch (err) {
        setError('Kunde inte ladda inlägg');
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8 pb-8">
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
      <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8 pb-8">
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
    <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-8 pb-8">
      <div className="w-full max-w-2xl px-4">
        <BackButton />
        <PostDetail post={post} />
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
      <div className="flex gap-4 sm:gap-6">
        <VotingSection upvotes={post.upvotes} />
        <PostContent post={post} />
      </div>
    </article>
  );
}

function VotingSection({ upvotes }: { upvotes: number }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2" role="group" aria-label="Röstningssektion">
      <VoteButton 
        direction="up" 
        upvotes={upvotes} 
        className="hover:text-orange-500 focus:ring-orange-500" 
      />
      <span className="text-sm sm:text-lg font-bold text-gray-900" aria-live="polite">
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
      className={`text-gray-400 p-1 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${className}`}
      aria-label={`Rösta ${isUpvote ? 'upp' : 'ner'}. Just nu ${upvotes} röster`}
      aria-pressed="false"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
      </svg>
    </button>
  );
}

function PostContent({ post }: { post: Post }) {
  return (
    <div className="flex-1 min-w-0">
      <PostMetadata author={post.author} timeAgo={post.timeAgo} />
      <PostTitle title={post.title} />
      <PostBody content={post.content} />
      <PostActions post={post} />
    </div>
  );
}

function PostMetadata({ author, timeAgo }: { author: string; timeAgo: string }) {
  return (
    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
      <span className="whitespace-nowrap">Postat av u/{author}</span>
      <span className="hidden xs:inline" aria-hidden="true">•</span>
      <time dateTime="2024-01-01" className="whitespace-nowrap">{timeAgo}</time>
    </div>
  );
}

function PostTitle({ title }: { title: string }) {
  return (
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
      {title}
    </h1>
  );
}

function PostBody({ content }: { content: string }) {
  return (
    <div className="prose prose-sm sm:prose-lg max-w-none mb-6">
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {content}
      </p>
    </div>
  );
}

function PostActions({ post }: { post: Post }) {
  const [localIsNominated, setLocalIsNominated] = React.useState(false);

  const handleNomination = () => {
    setLocalIsNominated(!localIsNominated);
    // Här skulle vi normalt anropa en API för att uppdatera nomineringen
    console.log('Nominering toggled for post', !localIsNominated);
  };

  const actions = [
    {
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      label: `${post.comments} kommentarer`,
      shortLabel: `${post.comments}`,
      ariaLabel: `${post.comments} kommentarer. Klicka för att visa kommentarer`,
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
    <div className="flex items-center justify-between gap-2 sm:gap-6 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-4" role="group" aria-label="Inläggsåtgärder">
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
      className={`flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex-shrink-0 ${
        isActive 
          ? 'text-green-600 hover:text-green-700' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg 
        className={`${isNominationButton ? 'w-4 h-4 sm:w-6 sm:h-6' : 'w-3 h-3 sm:w-5 sm:h-5'} ${isActive ? 'stroke-2' : 'stroke-1'}`} 
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

function CommentsSection({ comments }: { comments: number }) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Kommentarer ({comments})
      </h2>
      <div className="text-center text-gray-500 py-8">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p>Kommentarer kommer snart...</p>
      </div>
    </div>
  );
}
