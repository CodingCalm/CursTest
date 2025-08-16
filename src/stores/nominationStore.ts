import { create } from 'zustand';

interface NominationState {
  nominatedPosts: Set<number>;
  toggleNomination: (postId: number) => void;
  isNominated: (postId: number) => boolean;
}

export const useNominationStore = create<NominationState>((set, get) => ({
  nominatedPosts: new Set(),

  toggleNomination: (postId: number) => {
    set(state => {
      const newSet = new Set(state.nominatedPosts);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return { nominatedPosts: newSet };
    });
    console.log('Nominering toggled for post', postId);
  },

  isNominated: (postId: number) => {
    return get().nominatedPosts.has(postId);
  },
}));
