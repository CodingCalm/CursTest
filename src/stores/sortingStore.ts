import { create } from 'zustand';

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'mostUpvotes'
  | 'leastUpvotes'
  | 'mostComments';

interface SortingState {
  currentSort: SortOption;
  setSort: (sort: SortOption) => void;
  getSortLabel: (sort: SortOption) => string;
}

export const useSortingStore = create<SortingState>((set, get) => ({
  currentSort: 'newest',

  setSort: (sort: SortOption) => {
    set({ currentSort: sort });
  },

  getSortLabel: (sort: SortOption): string => {
    switch (sort) {
      case 'newest':
        return 'Nyast först';
      case 'oldest':
        return 'Äldst först';
      case 'mostUpvotes':
        return 'Flest uppröstningar';
      case 'leastUpvotes':
        return 'Minst uppröstningar';
      case 'mostComments':
        return 'Flest kommentarer';
      default:
        return 'Nyast först';
    }
  },
}));
