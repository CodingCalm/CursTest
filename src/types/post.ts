// Database-friendly types that match SQL schema
export interface Post {
  id: number;
  title: string;
  content: string;
  summary: string;
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
}

// Forslag types and service interface
export interface Forslag {
  id: number;
  title: string;
  introduction: string;
  summary: string;
  background: string;
  arguments: string[];
  conclusion: string;
  originalPostId: number;
  created_at?: string;
  updated_at?: string;
}

export interface ForslagService {
  getAllForslag(): Promise<Forslag[]>;
  getForslagById(id: number): Promise<Forslag | null>;
  getForslagByPostId(postId: number): Promise<Forslag[]>;
  createForslag(forslag: Omit<Forslag, 'id'>): Promise<Forslag>;
  updateForslag(id: number, updates: Partial<Forslag>): Promise<Forslag>;
  deleteForslag(id: number): Promise<boolean>;
}
