// Service layer exports
// This file controls which service implementation is used

import { PostService } from '@/types/post';
import { MockPostService } from './mock-post-service';
// import { SQLPostService, createDatabaseConnection } from './sql-post-service';

// Export the current service implementation
// Change this to switch between mock and SQL services
export const postService: PostService = new MockPostService();

// For SQL implementation, uncomment and use:
// const dbConnection = await createDatabaseConnection();
// export const postService: PostService = new SQLPostService(dbConnection);

// Export service classes for testing and advanced usage
export { MockPostService } from './mock-post-service';
export { SQLPostService, createDatabaseConnection } from './sql-post-service';
