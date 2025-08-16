"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useVotingStore } from "@/stores";
import { LoginPrompt } from "@/components/ui/LoginPrompt";

interface VoteButtonProps {
  direction: 'up' | 'down';
  postId: number;
  initialUpvotes: number;
  className?: string;
}

export function VoteButton({ 
  direction, 
  postId,
  initialUpvotes,
  className = ""
}: VoteButtonProps): React.JSX.Element {
  const { data: session } = useSession();
  const { initializePost, votePost, getUserVote, getUpvotes } = useVotingStore();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const userVote = getUserVote(postId);
  const currentUpvotes = getUpvotes(postId);
  
  // Initialize post when component mounts
  useEffect(() => {
    initializePost(postId, initialUpvotes);
  }, [postId, initialUpvotes, initializePost]);
  
  // Always use the calculated upvotes (initial + changes)
  const displayUpvotes = currentUpvotes;
  
  const isUpvote = direction === 'up';
  const isActive = userVote === direction;
  
  const iconPath = isUpvote 
    ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
    : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z";

  const handleVote = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    votePost(postId, direction);
  };

  const isAuthenticated = !!session;
  const isDisabled = !isAuthenticated;

  return (
    <>
      <button 
        className={`p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200 ${
          isActive 
            ? (isUpvote ? 'text-green-600' : 'text-red-600')
            : isDisabled 
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 hover:text-gray-600'
        } ${className}`}
        aria-label={isAuthenticated 
          ? `Rösta ${isUpvote ? 'upp' : 'ner'}. Just nu ${displayUpvotes} röster`
          : 'Logga in för att rösta'
        }
        aria-pressed={isActive}
        onClick={handleVote}
        disabled={isDisabled}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
        </svg>
      </button>
      
      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        action="rösta"
      />
    </>
  );
}
