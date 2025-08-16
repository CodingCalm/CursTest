import { create } from 'zustand';

interface VoteState {
  postId: number;
  initialUpvotes: number;
  voteChange: number;
  userVote: 'up' | 'down' | null;
}

interface VotingState {
  votes: Map<number, VoteState>;
  initializePost: (postId: number, initialUpvotes: number) => void;
  votePost: (postId: number, direction: 'up' | 'down') => void;
  getVoteState: (postId: number) => VoteState;
  getUpvotes: (postId: number) => number;
  getUserVote: (postId: number) => 'up' | 'down' | null;
}

export const useVotingStore = create<VotingState>((set, get) => ({
  votes: new Map(),

  initializePost: (postId: number, initialUpvotes: number) => {
    set(state => {
      const newVotes = new Map(state.votes);
      const existingVote = newVotes.get(postId);

      if (!existingVote) {
        newVotes.set(postId, {
          postId,
          initialUpvotes,
          voteChange: 0,
          userVote: null,
        });
      }

      return { votes: newVotes };
    });
  },

  votePost: (postId: number, direction: 'up' | 'down') => {
    set(state => {
      const newVotes = new Map(state.votes);
      const currentVote = newVotes.get(postId);
      let newVoteChange: number;
      let newUserVote: 'up' | 'down' | null;

      if (!currentVote) {
        // This shouldn't happen if initializePost is called properly
        console.warn(`Vote state not initialized for post ${postId}`);
        return state;
      }

      // Existing vote
      if (currentVote.userVote === direction) {
        // Remove vote (clicking same direction)
        newVoteChange = currentVote.voteChange - (direction === 'up' ? 1 : -1);
        newUserVote = null;
      } else if (currentVote.userVote === null) {
        // New vote
        newVoteChange = currentVote.voteChange + (direction === 'up' ? 1 : -1);
        newUserVote = direction;
      } else {
        // Change vote
        newVoteChange = currentVote.voteChange + (direction === 'up' ? 2 : -2);
        newUserVote = direction;
      }

      newVotes.set(postId, {
        postId,
        initialUpvotes: currentVote.initialUpvotes,
        voteChange: newVoteChange,
        userVote: newUserVote,
      });
      return { votes: newVotes };
    });

    console.log(`Voted ${direction} on post ${postId}`);
  },

  getVoteState: (postId: number): VoteState => {
    const state = get();
    const voteState = state.votes.get(postId);

    if (!voteState) {
      // Return default state if no votes yet
      return {
        postId,
        initialUpvotes: 0,
        voteChange: 0,
        userVote: null,
      };
    }

    return voteState;
  },

  getUpvotes: (postId: number): number => {
    const voteState = get().getVoteState(postId);
    return voteState.initialUpvotes + voteState.voteChange;
  },
  getUserVote: (postId: number): 'up' | 'down' | null => {
    const voteState = get().getVoteState(postId);
    return voteState.userVote;
  },
}));
