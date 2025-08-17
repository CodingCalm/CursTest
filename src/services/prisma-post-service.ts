import { prisma } from '@/lib/prisma';
import { Post, PostService } from '@/types/post';
import { NotFoundError, ValidationError } from '@/types/errors';

export class PrismaPostService implements PostService {
  async getAllPosts(): Promise<Post[]> {
    try {
      console.log('🗄️ PrismaPostService: Fetching posts from database...');
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              name: true,
            },
          },
          votes: true,
          nominations: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      console.log(
        '🗄️ PrismaPostService: Raw posts from database:',
        posts.length,
        'posts'
      );
      console.log('🗄️ PrismaPostService: First raw post:', posts[0]);

      const mappedPosts = posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        summary: post.summary,
        author: post.author.name,
        upvotes: post.upvotes,
        comments: post.comments.length,
        nominations: post.nominations.length,
        timeAgo: this.calculateTimeAgo(post.createdAt),
        created_at: post.createdAt.toISOString(),
        updated_at: post.updatedAt.toISOString(),
      }));

      console.log(
        '🗄️ PrismaPostService: Mapped posts:',
        mappedPosts.length,
        'posts'
      );
      console.log('🗄️ PrismaPostService: First mapped post:', mappedPosts[0]);

      return mappedPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Kunde inte hämta inlägg från databasen');
    }
  }

  async getPostById(id: number): Promise<Post | null> {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              name: true,
            },
          },
          votes: true,
          nominations: true,
          comments: true,
        },
      });

      if (!post) {
        return null;
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        summary: post.summary,
        author: post.author.name,
        upvotes: post.upvotes,
        comments: post.comments.length,
        nominations: post.nominations.length,
        timeAgo: this.calculateTimeAgo(post.createdAt),
        created_at: post.createdAt.toISOString(),
        updated_at: post.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new Error('Kunde inte hämta inlägg från databasen');
    }
  }

  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    try {
      // Find or create user (for now, we'll use a default user)
      const defaultUser = await prisma.user.findFirst({
        where: { email: 'test@example.com' },
      });

      if (!defaultUser) {
        throw new ValidationError(
          'Ingen användare hittad för att skapa inlägg'
        );
      }

      const post = await prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          summary: postData.summary,
          authorId: defaultUser.id,
          upvotes: postData.upvotes || 0,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
          votes: true,
          nominations: true,
          comments: true,
        },
      });

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        summary: post.summary,
        author: post.author.name,
        upvotes: post.upvotes,
        comments: post.comments?.length || 0,
        nominations: post.nominations?.length || 0,
        timeAgo: this.calculateTimeAgo(post.createdAt),
        created_at: post.createdAt.toISOString(),
        updated_at: post.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error creating post:', error);
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new Error('Kunde inte skapa inlägg i databasen');
    }
  }

  async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
    try {
      const post = await prisma.post.update({
        where: { id },
        data: {
          title: updates.title,
          content: updates.content,
          summary: updates.summary,
          upvotes: updates.upvotes,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
          votes: true,
          nominations: true,
          comments: true,
        },
      });

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        summary: post.summary,
        author: post.author.name,
        upvotes: post.upvotes,
        comments: post.comments.length,
        nominations: post.nominations.length,
        timeAgo: this.calculateTimeAgo(post.createdAt),
        created_at: post.createdAt.toISOString(),
        updated_at: post.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error updating post:', error);
      throw new NotFoundError('Inlägg hittades inte');
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      await prisma.post.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new NotFoundError('Inlägg hittades inte');
    }
  }

  // Note: updateNominations method removed as nominations is a relation, not a field
  // To update nominations, you would need to create/delete Nomination records instead

  private calculateTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Nu';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minut${minutes > 1 ? 'er' : ''} sedan`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} timm${hours > 1 ? 'ar' : 'e'} sedan`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} dag${days > 1 ? 'ar' : ''} sedan`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} veck${weeks > 1 ? 'or' : 'a'} sedan`;
    }
  }
}
