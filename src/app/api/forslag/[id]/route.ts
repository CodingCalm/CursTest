import { NextRequest, NextResponse } from 'next/server';
import { PrismaForslagService } from '@/services/prisma-forslag-service';

// GET route to fetch a specific forslag by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const forslagId = parseInt(resolvedParams.id);

    if (isNaN(forslagId)) {
      return NextResponse.json(
        { error: 'Ogiltigt förslag-ID' },
        { status: 400 }
      );
    }

    const forslagService = new PrismaForslagService();
    const forslag = await forslagService.getForslagById(forslagId);

    if (!forslag) {
      return NextResponse.json(
        { error: 'Förslag hittades inte' },
        { status: 404 }
      );
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
