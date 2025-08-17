// Service layer exports
// Switch between mock and database services here

import { PrismaPostService } from './prisma-post-service';
import { PrismaForslagService } from './prisma-forslag-service';
import { PostService } from '@/types/post';
import { ForslagService } from '@/types/post';

// Always use database services - no more mock data
console.log('🔧 Using database services only');

// Post Service
const postService: PostService = new PrismaPostService();

// Forslag Service
const forslagService: ForslagService = new PrismaForslagService();

export { postService, forslagService };
