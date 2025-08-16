import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Mock users with hashed passwords
// In production, these would come from a database
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    role: 'user',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Helper function to find user by email
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find(user => user.email === email);
}

// Helper function to find user by id
export function findUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

// Helper function to verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Helper function to hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
