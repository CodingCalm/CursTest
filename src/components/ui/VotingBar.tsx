'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { LoginPrompt } from './LoginPrompt';

interface VotingBarProps {
  upvotes: number;
  downvotes: number;
  onVote?: (direction: 'up' | 'down') => void;
  onImportant?: (isImportant: boolean) => void;
  className?: string;
}

export function VotingBar({
  upvotes = 0,
  downvotes = 0,
  onVote,
  onImportant,
  className = '',
}: VotingBarProps): React.JSX.Element {
  const { data: session } = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isImportant, setIsImportant] = useState(false);

  const totalVotes = localUpvotes + localDownvotes;
  const upvotePercentage =
    totalVotes > 0 ? (localUpvotes / totalVotes) * 100 : 50;

  const handleVote = (direction: 'up' | 'down') => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }

    // If user already voted this direction, remove the vote
    if (userVote === direction) {
      if (direction === 'up') {
        setLocalUpvotes(prev => prev - 1);
      } else {
        setLocalDownvotes(prev => prev - 1);
      }
      setUserVote(null);
      return;
    }

    // If user voted the other direction, remove that vote first
    if (userVote === 'up') {
      setLocalUpvotes(prev => prev - 1);
    } else if (userVote === 'down') {
      setLocalDownvotes(prev => prev - 1);
    }

    // Add new vote
    if (direction === 'up') {
      setLocalUpvotes(prev => prev + 1);
    } else {
      setLocalDownvotes(prev => prev + 1);
    }

    // Update user vote
    setUserVote(direction);

    // Call parent callback if provided
    onVote?.(direction);
  };

  const isUpvoted = userVote === 'up';
  const isDownvoted = userVote === 'down';

  const handleImportant = () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }

    const newImportantState = !isImportant;
    setIsImportant(newImportantState);
    onImportant?.(newImportantState);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}
      >
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            Rösta på förslaget
          </h3>
          <p className='text-sm text-gray-600'>
            Vad tycker du om detta förslag?
          </p>
        </div>

        {/* Voting Buttons */}
        <div className='flex items-center justify-center gap-4 mb-6'>
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 ${
              isUpvoted
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : isDownvoted
                  ? 'bg-gray-50 text-gray-400 border-2 border-transparent cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
            aria-label={
              isUpvoted
                ? `Ta bort uppröstning. Just nu ${localUpvotes} uppröstningar`
                : isDownvoted
                  ? 'Du har redan röstat ner, kan inte rösta upp'
                  : `Rösta upp. Just nu ${localUpvotes} uppröstningar`
            }
            aria-pressed={isUpvoted}
            disabled={isDownvoted}
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>{localUpvotes}</span>
          </button>

          <button
            onClick={() => handleVote('down')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 ${
              isDownvoted
                ? 'bg-red-100 text-red-700 border-2 border-red-300'
                : isUpvoted
                  ? 'bg-gray-50 text-gray-400 border-2 border-transparent cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
            aria-label={
              isDownvoted
                ? `Ta bort neråtröstning. Just nu ${localDownvotes} neråtröstningar`
                : isUpvoted
                  ? 'Du har redan röstat upp, kan inte rösta ner'
                  : `Rösta ner. Just nu ${localDownvotes} neråtröstningar`
            }
            aria-pressed={isDownvoted}
            disabled={isUpvoted}
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>{localDownvotes}</span>
          </button>

          <button
            onClick={handleImportant}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 ${
              isImportant
                ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
            }`}
            aria-label={
              isImportant ? 'Ta bort viktigt-märkning' : 'Märk som viktigt'
            }
            aria-pressed={isImportant}
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-medium'>Viktigt</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm text-gray-600'>
            <span>Uppröstningar: {localUpvotes}</span>
            <span>Neråtröstningar: {localDownvotes}</span>
          </div>

          <div className='relative h-4 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out'
              style={{ width: `${upvotePercentage}%` }}
              aria-label={`${upvotePercentage.toFixed(1)}% uppröstningar`}
            />
            <div
              className='absolute top-0 right-0 h-full bg-gradient-to-l from-red-500 to-red-600 transition-all duration-500 ease-out'
              style={{ width: `${100 - upvotePercentage}%` }}
              aria-label={`${(100 - upvotePercentage).toFixed(1)}% neråtröstningar`}
            />

            {/* Center line for 50% mark */}
            <div className='absolute top-0 left-1/2 h-full w-0.5 bg-gray-400 transform -translate-x-1/2' />
          </div>

          <div className='text-center text-sm text-gray-500'>
            {totalVotes > 0 ? (
              <span>
                {upvotePercentage > 50
                  ? 'Majoritet stöder'
                  : upvotePercentage < 50
                    ? 'Majoritet motsätter sig'
                    : 'Jämnt delat'}
                ({upvotePercentage.toFixed(1)}% uppröstningar)
              </span>
            ) : (
              <span>Inga röster än</span>
            )}
          </div>
        </div>
      </div>

      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        action='rösta'
      />
    </>
  );
}
