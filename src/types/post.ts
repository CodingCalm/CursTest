// Database-friendly types that match SQL schema
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
  nominations: number;
  created_at?: string; // For future SQL integration
  updated_at?: string; // For future SQL integration
}

// Service layer interface - can be replaced with SQL implementation
export interface PostService {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
  createPost(post: Omit<Post, 'id'>): Promise<Post>;
  updatePost(id: number, updates: Partial<Post>): Promise<Post>;
  deletePost(id: number): Promise<boolean>;
  updateNominations(id: number, nominations: number): Promise<Post>;
}
