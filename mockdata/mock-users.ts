import { User } from '../src/types/user';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'ADMIN',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Anna Andersson',
    email: 'anna@example.com',
    role: 'USER',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 4,
    name: 'Erik Svensson',
    email: 'erik@example.com',
    role: 'USER',
    created_at: '2024-01-15T07:15:00Z',
    updated_at: '2024-01-15T07:15:00Z',
  },
  {
    id: 5,
    name: 'Maria Lindberg',
    email: 'maria@example.com',
    role: 'USER',
    created_at: '2024-01-14T14:20:00Z',
    updated_at: '2024-01-14T14:20:00Z',
  },
];

export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const verifyPassword = (password: string): boolean => {
  // For mock purposes, accept any password
  return password === 'password';
};
