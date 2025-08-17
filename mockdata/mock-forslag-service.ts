import { Forslag, ForslagService } from '../src/types/post';
import { mockForslagData } from './mock-forslag';

// Mock implementation - for backup purposes only
export class MockForslagService implements ForslagService {
  private forslag: Forslag[] = [...mockForslagData];

  async getAllForslag(): Promise<Forslag[]> {
    await this.simulateDelay();
    return [...this.forslag];
  }

  async getForslagById(id: number): Promise<Forslag | null> {
    await this.simulateDelay();
    const forslag = this.forslag.find(f => f.id === id);
    return forslag ? { ...forslag } : null;
  }

  async getForslagByPostId(postId: number): Promise<Forslag[]> {
    await this.simulateDelay();
    const relatedForslag = this.forslag.filter(
      f => f.originalPostId === postId
    );
    return relatedForslag.map(f => ({ ...f }));
  }

  async createForslag(forslagData: Omit<Forslag, 'id'>): Promise<Forslag> {
    await this.simulateDelay();

    // Validate required fields
    if (
      !forslagData.title ||
      !forslagData.introduction ||
      !forslagData.summary ||
      !forslagData.background ||
      !forslagData.arguments ||
      !forslagData.conclusion
    ) {
      throw new Error(
        'Missing required fields: title, introduction, summary, background, arguments, and conclusion are required'
      );
    }

    const newForslag: Forslag = {
      ...forslagData,
      id: this.generateNextId(),
    };

    this.forslag.push(newForslag);
    return { ...newForslag };
  }

  async updateForslag(id: number, updates: Partial<Forslag>): Promise<Forslag> {
    await this.simulateDelay();

    const index = this.forslag.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error(`Forslag with id ${id} not found`);
    }

    // Don't allow updating the ID
    const { id: _, ...safeUpdates } = updates;

    this.forslag[index] = { ...this.forslag[index], ...safeUpdates };
    return { ...this.forslag[index] };
  }

  async deleteForslag(id: number): Promise<boolean> {
    await this.simulateDelay();

    const index = this.forslag.findIndex(f => f.id === id);
    if (index === -1) {
      return false;
    }

    this.forslag.splice(index, 1);
    return true;
  }

  // Helper methods
  private generateNextId(): number {
    return Math.max(...this.forslag.map(f => f.id), 0) + 1;
  }

  private simulateDelay(): Promise<void> {
    // Simulate realistic database delay (10-50ms)
    const delay = Math.random() * 40 + 10;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
