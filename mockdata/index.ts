// Mock data exports - for backup purposes only
// This directory contains all mock data and services that can be used
// if the database is unavailable or for testing purposes.

// Mock data
export { mockPostsData } from './mock-posts';
export { mockForslagData, mockForslag } from './mock-forslag';
export { mockUsers, findUserByEmail, verifyPassword } from './mock-users';

// Mock services
export { MockPostService } from './mock-post-service';
export { MockForslagService } from './mock-forslag-service';

// Note: These are NOT used in production - only for backup/testing
