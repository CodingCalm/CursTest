// Service layer exports
// Currently using mock data for development

import { PostService, ForslagService } from '@/types/post';
import { MockPostService } from './mock-post-service';
import { MockForslagService } from './mock-forslag-service';

// Current implementation using mock data
export const postService: PostService = new MockPostService();
export const forslagService: ForslagService = new MockForslagService();

// Export for testing
export { MockPostService } from './mock-post-service';
export { MockForslagService } from './mock-forslag-service';
