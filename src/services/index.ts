// Service layer exports
// Switch between mock and database services here

import { MockPostService } from './mock-post-service';
import { PrismaPostService } from './prisma-post-service';
import { MockForslagService } from './mock-forslag-service';
import { PostService } from '@/types/post';
import { ForslagService } from '@/types/post';

// Configuration: Set to 'mock' or 'prisma'
const SERVICE_MODE = process.env.SERVICE_MODE || 'mock';

// Post Service
let postService: PostService;
if (SERVICE_MODE === 'prisma') {
  postService = new PrismaPostService();
} else {
  postService = new MockPostService();
}

// Forslag Service (still using mock for now)
const forslagService: ForslagService = new MockForslagService();

export { postService, forslagService };
