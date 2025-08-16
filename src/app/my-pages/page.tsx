"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/ui/PageContainer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function MyPages(): React.JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (status === "loading") {
    return (
      <PageContainer>
        <LoadingSpinner message="Kontrollerar inloggning..." />
      </PageContainer>
    );
  }

  if (!session) {
    router.push("/auth/signin");
    return <div />;
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Mina sidor</h1>
          <p className="text-gray-700 text-lg">
            Välkommen tillbaka, {session.user?.name || session.user?.email}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mina inlägg */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mina inlägg</h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <svg 
                  className="w-12 h-12 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <p className="text-gray-600 mb-4">Du har inte skapat några inlägg än</p>
                <a
                  href="/posts/create"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Skapa ditt första inlägg
                </a>
              </div>
            </div>
          </div>

          {/* Mina aktiviteter */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mina aktiviteter</h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <svg 
                  className="w-12 h-12 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                  />
                </svg>
                <p className="text-gray-600">Inga aktiviteter att visa än</p>
              </div>
            </div>
          </div>

          {/* Mina röster */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mina röster</h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <svg 
                  className="w-12 h-12 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" 
                  />
                </svg>
                <p className="text-gray-600">Du har inte röstat på något än</p>
              </div>
            </div>
          </div>

          {/* Mina nomineringar */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mina nomineringar</h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <svg 
                  className="w-12 h-12 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 10l7-7m0 0l7 7m-7-7v18" 
                  />
                </svg>
                <p className="text-gray-600">Du har inte nominerat något än</p>
              </div>
            </div>
          </div>
        </div>

        {/* Snabbåtgärder */}
        <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Snabbåtgärder</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="/posts/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
            >
              <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-900">Skapa inlägg</h3>
                <p className="text-sm text-gray-600">Dela dina tankar med samhället</p>
              </div>
            </a>
            
            <a
              href="/"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
            >
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-900">Öppet samtal</h3>
                <p className="text-sm text-gray-600">Se alla diskussioner</p>
              </div>
            </a>
            
            <a
              href="/propositions"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50"
            >
              <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium text-gray-900">Förslag</h3>
                <p className="text-sm text-gray-600">Se alla förslag</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
