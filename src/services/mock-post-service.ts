import { Post, PostService } from '@/types/post';
import { mockPostsData } from '@/data/mock-posts';

// Mock implementation - replace with SQL service later
export class MockPostService implements PostService {
  private posts: Post[] = [...mockPostsData];

  async getAllPosts(): Promise<Post[]> {
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 10));
    return [...this.posts];
  }

  async getPostById(id: number): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 10));
    const post = this.posts.find(p => p.id === id);
    return post ? { ...post } : null;
  }

  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 10));
    const newPost: Post = {
      ...postData,
      id: Math.max(...this.posts.map(p => p.id)) + 1
    };
    this.posts.push(newPost);
    return { ...newPost };
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
    await new Promise(resolve => setTimeout(resolve, 10));
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }
    this.posts[index] = { ...this.posts[index], ...updates };
    return { ...this.posts[index] };
  }

  async deletePost(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 10));
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    this.posts.splice(index, 1);
    return true;
  }

  async updateNominations(id: number, nominations: number): Promise<Post> {
    return this.updatePost(id, { nominations });
  }
}
