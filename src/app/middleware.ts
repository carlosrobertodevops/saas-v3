import createMiddleware from 'next-intl/middleware';
import { routing } from '@/src/i18n/routing';

// Clerk
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Cria o middleware do next-intl
const intlMiddleware = createMiddleware(routing);

// Combina ambos os middlewares
export default clerkMiddleware(async (auth, req) => {
  // Primeiro executa o middleware do Clerk
  const clerkResponse = await clerkMiddleware(auth, req);
  // Se o Clerk já retornou uma resposta (redirect, etc), usa essa
  if (clerkResponse) {
    return clerkResponse;
  }
  // Caso contrário, executa o middleware do next-intl
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|.*\\..*).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};