import { useState, useEffect, useCallback } from 'react';
import { Post } from '@/types';
import { postService } from '@/services';

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
      const fetchedPost = await postService.getPostById(postId);
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
