import { PrismaClient } from '@prisma/client';
import { Forslag, ForslagService } from '@/types/post';

const prisma = new PrismaClient();

export class PrismaForslagService implements ForslagService {
  async getAllForslag(): Promise<Forslag[]> {
    try {
      const forslag = await prisma.forslag.findMany({
        include: {
          originalPost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return forslag.map(f => ({
        id: f.id,
        title: f.title,
        introduction: f.introduction,
        summary: f.summary,
        background: f.background,
        arguments: f.arguments,
        conclusion: f.conclusion,
        originalPostId: f.originalPostId,
        createdAt: f.createdAt.toISOString(),
        updatedAt: f.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching forslag:', error);
      throw new Error('Kunde inte hämta förslag från databasen');
    }
  }

  async getForslagById(id: number): Promise<Forslag | null> {
    try {
      const forslag = await prisma.forslag.findUnique({
        where: { id },
        include: {
          originalPost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      if (!forslag) {
        return null;
      }

      return {
        id: forslag.id,
        title: forslag.title,
        introduction: forslag.introduction,
        summary: forslag.summary,
        background: forslag.background,
        arguments: forslag.arguments,
        conclusion: forslag.conclusion,
        originalPostId: forslag.originalPostId,
        createdAt: forslag.createdAt.toISOString(),
        updatedAt: forslag.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error fetching forslag:', error);
      throw new Error('Kunde inte hämta förslag från databasen');
    }
  }

  async getForslagByPostId(postId: number): Promise<Forslag[]> {
    try {
      const forslag = await prisma.forslag.findMany({
        where: { originalPostId: postId },
        include: {
          originalPost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return forslag.map(f => ({
        id: f.id,
        title: f.title,
        introduction: f.introduction,
        summary: f.summary,
        background: f.background,
        arguments: f.arguments,
        conclusion: f.conclusion,
        originalPostId: f.originalPostId,
        createdAt: f.createdAt.toISOString(),
        updatedAt: f.updatedAt.toISOString(),
      }));
    } catch (error) {
      console.error('Error fetching forslag by post ID:', error);
      throw new Error('Kunde inte hämta förslag från databasen');
    }
  }

  async createForslag(forslagData: Omit<Forslag, 'id'>): Promise<Forslag> {
    try {
      const forslag = await prisma.forslag.create({
        data: {
          title: forslagData.title,
          introduction: forslagData.introduction,
          summary: forslagData.summary,
          background: forslagData.background,
          arguments: forslagData.arguments,
          conclusion: forslagData.conclusion,
          originalPostId: forslagData.originalPostId,
        },
        include: {
          originalPost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return {
        id: forslag.id,
        title: forslag.title,
        introduction: forslag.introduction,
        summary: forslag.summary,
        background: forslag.background,
        arguments: forslag.arguments,
        conclusion: forslag.conclusion,
        originalPostId: forslag.originalPostId,
        createdAt: forslag.createdAt.toISOString(),
        updatedAt: forslag.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error creating forslag:', error);
      throw new Error('Kunde inte skapa förslag i databasen');
    }
  }

  async updateForslag(id: number, updates: Partial<Forslag>): Promise<Forslag> {
    try {
      const forslag = await prisma.forslag.update({
        where: { id },
        data: {
          title: updates.title,
          introduction: updates.introduction,
          summary: updates.summary,
          background: updates.background,
          arguments: updates.arguments,
          conclusion: updates.conclusion,
        },
        include: {
          originalPost: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return {
        id: forslag.id,
        title: forslag.title,
        introduction: forslag.introduction,
        summary: forslag.summary,
        background: forslag.background,
        arguments: forslag.arguments,
        conclusion: forslag.conclusion,
        originalPostId: forslag.originalPostId,
        createdAt: forslag.createdAt.toISOString(),
        updatedAt: forslag.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error('Error updating forslag:', error);
      throw new Error('Kunde inte uppdatera förslag i databasen');
    }
  }

  async deleteForslag(id: number): Promise<boolean> {
    try {
      await prisma.forslag.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting forslag:', error);
      return false;
    }
  }
}
