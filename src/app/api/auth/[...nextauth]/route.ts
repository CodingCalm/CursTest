/**
 * NextAuth.js API Route Configuration
 *
 * This file configures NextAuth.js for email/password authentication
 * using our custom AuthenticationService for business logic.
 *
 * Features:
 * - Email/password authentication
 * - JWT session strategy
 * - Role-based access control
 * - Comprehensive error handling and logging
 * - Development debug mode
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { AuthenticationService } from '@/services/auth/AuthenticationService';
import { AuthConfig } from '@/config/auth.config';
import { UserRole } from '@/types/user';

// Initialize services with proper error handling
const authService = new AuthenticationService();
const authConfig = AuthConfig.getInstance();

// Validate configuration on startup
if (!authConfig.validate()) {
  console.error('NextAuth: Invalid configuration detected');
  throw new Error('NextAuth configuration is invalid');
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Authorize user with email and password
       * Uses AuthenticationService for business logic
       */
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.warn('NextAuth: Missing credentials provided');
            return null;
          }

          const result = await authService.authenticateUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (!result.success || !result.user) {
            console.warn('NextAuth: Authentication failed');
            return null;
          }

          // Convert UserProfile to NextAuth User format
          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name,
            role: result.user.role,
          };
        } catch (error) {
          console.error('NextAuth: Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.role = user.role as UserRole;
          token.id = user.id as string;
          console.log(`NextAuth: JWT token created for user: ${user.email}`);
        }
        return token;
      } catch (error) {
        console.error('NextAuth: JWT callback error:', error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.id as string;
          session.user.role = token.role as UserRole;
        }
        return session;
      } catch (error) {
        console.error('NextAuth: Session callback error:', error);
        return session;
      }
    },
  },
  secret: authConfig.getSecret(),
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  events: {
    async signIn({ user }) {
      console.log(`NextAuth: User signed in: ${user.email}`);
    },
    async signOut() {
      console.log('NextAuth: User signed out');
    },
  },
});

export const { GET, POST } = handlers;
