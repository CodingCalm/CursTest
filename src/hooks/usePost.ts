import { useState, useEffect, useCallback } from 'react';
import { Post } from '@/types';

interface UsePostReturn {
  post: Post | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePost(postId: number): UsePostReturn {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching post from API:', postId);

      const response = await fetch(`/api/posts/${postId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Inlägg hittades inte');
        } else {
          throw new Error('Failed to fetch post');
        }
        return;
      }

      const data = await response.json();
      const fetchedPost = data.post;

      console.log('📊 Fetched post from API:', fetchedPost);

      setPost(fetchedPost);
    } catch (err) {
      setError('Kunde inte ladda inlägg');
      console.error('Error loading post:', err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  };
}
