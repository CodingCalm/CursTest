import { useState, useEffect } from 'react';
import { Post } from '@/types';

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

      // Clear cache temporarily to force fresh data
      postsCache = null;

      // Check cache first
      const now = Date.now();
      if (postsCache && now - cacheTimestamp < CACHE_DURATION) {
        console.log('📦 Using cached posts:', postsCache.length, 'posts');
        setPosts(postsCache);
        setLoading(false);
        return;
      }

      console.log('🔄 Fetching fresh posts from API...');

      // Fetch from API route instead of service directly
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const fetchedPosts = data.posts;

      console.log('📊 Fetched posts from API:', fetchedPosts.length, 'posts');
      console.log('📊 First post:', fetchedPosts[0]);

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
