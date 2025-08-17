import { NextRequest, NextResponse } from 'next/server';
import { PrismaForslagService } from '@/services/prisma-forslag-service';

// GET route to fetch all forslag or forslag by postId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    const forslagService = new PrismaForslagService();

    let forslag;
    if (postId) {
      const postIdNum = parseInt(postId);
      if (isNaN(postIdNum)) {
        return NextResponse.json(
          { error: 'Ogiltigt post-ID' },
          { status: 400 }
        );
      }
      forslag = await forslagService.getForslagByPostId(postIdNum);
    } else {
      forslag = await forslagService.getAllForslag();
    }

    return NextResponse.json({
      success: true,
      forslag,
    });
  } catch (error) {
    console.error('Error fetching forslag:', error);
    return NextResponse.json(
      { error: 'Kunde inte hämta förslag' },
      { status: 500 }
    );
  }
}
