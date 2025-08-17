import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For now, we'll handle authentication at the page level
  // This avoids Edge Runtime issues with NextAuth
  return NextResponse.next();
}

export const config = {
  matcher: ['/posts/create', '/my-pages'],
};
