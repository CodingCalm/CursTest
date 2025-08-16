import { Post, PostService } from '@/types/post';
import { mockPostsData } from '@/data/mock-posts';

// Mock implementation - replace with SQL service later
export class MockPostService implements PostService {
  private posts: Post[] = [...mockPostsData];

  async getAllPosts(): Promise<Post[]> {
    // Simulate database delay
    await this.simulateDelay();
    return [...this.posts];
  }

  async getPostById(id: number): Promise<Post | null> {
    await this.simulateDelay();
    const post = this.posts.find(p => p.id === id);
    return post ? { ...post } : null;
  }

  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    await this.simulateDelay();
    
    // Validate required fields
    if (!postData.title || !postData.content || !postData.summary || !postData.author) {
      throw new Error('Missing required fields: title, content, summary, and author are required');
    }

    const newPost: Post = {
      ...postData,
      id: this.generateNextId(),
      upvotes: postData.upvotes || 0,
      comments: postData.comments || 0,
      nominations: postData.nominations || 0,
      timeAgo: postData.timeAgo || 'Nu'
    };
    
    this.posts.push(newPost);
    return { ...newPost };
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
    await this.simulateDelay();
    
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }
    
    // Don't allow updating the ID
    const { id: _, ...safeUpdates } = updates;
    
    this.posts[index] = { ...this.posts[index], ...safeUpdates };
    return { ...this.posts[index] };
  }

  async deletePost(id: number): Promise<boolean> {
    await this.simulateDelay();
    
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    
    this.posts.splice(index, 1);
    return true;
  }

  async updateNominations(id: number, nominations: number): Promise<Post> {
    if (nominations < 0) {
      throw new Error('Nominations cannot be negative');
    }
    
    return this.updatePost(id, { nominations });
  }

  // Helper methods
  private generateNextId(): number {
    return Math.max(...this.posts.map(p => p.id), 0) + 1;
  }

  private simulateDelay(): Promise<void> {
    // Simulate realistic database delay (10-50ms)
    const delay = Math.random() * 40 + 10;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
