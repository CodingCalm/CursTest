import { NextRequest, NextResponse } from 'next/server';
import { PrismaPostService } from '@/services/prisma-post-service';

// GET route to fetch a specific post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Ogiltigt post-ID' }, { status: 400 });
    }

    const postService = new PrismaPostService();
    const post = await postService.getPostById(postId);

    if (!post) {
      return NextResponse.json(
        { error: 'Inlägg hittades inte' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Kunde inte hämta inlägg' },
      { status: 500 }
    );
  }
}
