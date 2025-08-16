import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { auth } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    // Kontrollera autentisering
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Du måste vara inloggad för att skapa inlägg' },
        { status: 401 }
      );
    }

    // Hämta data från request body
    const body = await request.json();
    const { title, summary, content } = body;

    // Validera input
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Titel och innehåll är obligatoriska' },
        { status: 400 }
      );
    }

    // Använd användarens sammanfattning eller skapa en från innehållet
    const finalSummary = summary?.trim() || (content.length > 150 
      ? content.substring(0, 150) + "..."
      : content);

    // Här skulle du normalt spara till databas
    // För nu returnerar vi bara en simulering
    const newPost = {
      id: Date.now(), // Simulerat ID
      title: title.trim(),
      content: content.trim(),
      summary: finalSummary,
      author: session.user.name || session.user.email || 'Anonym',
      upvotes: 0,
      comments: 0,
      timeAgo: 'Nu',
      nominations: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Simulera lite fördröjning
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true, 
        post: newPost,
        message: 'Inlägg skapat framgångsrikt'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Ett fel uppstod när inlägget skulle skapas' },
      { status: 500 }
    );
  }
}
