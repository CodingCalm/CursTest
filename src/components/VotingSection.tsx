"use client";

import React, { useEffect } from "react";
import { useNominationStore, useVotingStore } from "@/stores";
import { VoteButton, CommentDisplay, NominationButton } from "@/components";

interface VotingSectionProps {
  upvotes: number;
  comments: number;
  postId: number;
  showComments?: boolean;
}

export function VotingSection({ 
  upvotes, 
  comments, 
  postId, 
  showComments = true 
}: VotingSectionProps): React.JSX.Element {
  const { isNominated, toggleNomination } = useNominationStore();
  const { initializePost, getUpvotes } = useVotingStore();
  const nominated = isNominated(postId);
  
  // Initialize post when component mounts
  useEffect(() => {
    initializePost(postId, upvotes);
  }, [postId, upvotes, initializePost]);
  
  // Get current upvotes from store (initial + changes)
  const displayUpvotes = getUpvotes(postId);

  const handleNomination = () => {
    toggleNomination(postId);
  };

  return (
    <div className="flex flex-row items-center justify-between mt-4 pt-4 border-t border-gray-200" role="group" aria-label="Röstningssektion">
      <div className="flex items-center gap-2">
        <VoteButton 
          direction="up" 
          postId={postId}
          initialUpvotes={upvotes}
        />
        <span className="text-sm font-bold text-gray-900 mx-2" aria-live="polite">
          {displayUpvotes}
        </span>
        <VoteButton 
          direction="down" 
          postId={postId}
          initialUpvotes={upvotes}
        />
      </div>
      <div className="flex items-center gap-2">
        {showComments && (
          <CommentDisplay comments={comments} />
        )}
        <NominationButton 
          isNominated={nominated}
          onToggle={handleNomination}
        />
      </div>
    </div>
  );
}
