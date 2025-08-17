// Service layer exports
// Switch between mock and database services here

import { MockPostService } from './mock-post-service';
import { PrismaPostService } from './prisma-post-service';
import { MockForslagService } from './mock-forslag-service';
import { PostService } from '@/types/post';
import { ForslagService } from '@/types/post';

// Configuration: Set to 'mock' or 'prisma'
// Only run this on server-side to avoid client-side issues
const SERVICE_MODE =
  typeof window === 'undefined' ? process.env.SERVICE_MODE || 'mock' : 'mock';

if (typeof window === 'undefined') {
  console.log('🔧 SERVICE_MODE:', SERVICE_MODE);
  console.log('🔧 Environment variables:', {
    SERVICE_MODE: process.env.SERVICE_MODE,
    NODE_ENV: process.env.NODE_ENV,
  });
}

// Post Service
let postService: PostService;
if (SERVICE_MODE === 'prisma') {
  if (typeof window === 'undefined') {
    console.log('📊 Using PrismaPostService (Database)');
  }
  postService = new PrismaPostService();
} else {
  if (typeof window === 'undefined') {
    console.log('🎭 Using MockPostService (Mock Data)');
  }
  postService = new MockPostService();
}

// Forslag Service (still using mock for now)
const forslagService: ForslagService = new MockForslagService();

export { postService, forslagService };
