import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { postService } from '@/services';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Cache for posts to avoid unnecessary refetches
let postsCache: Post[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const now = Date.now();
      if (postsCache && now - cacheTimestamp < CACHE_DURATION) {
        setPosts(postsCache);
        setLoading(false);
        return;
      }

      const fetchedPosts = await postService.getAllPosts();

      // Update cache
      postsCache = fetchedPosts;
      cacheTimestamp = now;

      setPosts(fetchedPosts);
    } catch (err) {
      setError('Kunde inte ladda inlägg');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
}
