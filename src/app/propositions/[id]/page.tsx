"use client";

import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { mockForslag, type Forslag } from "@/data";

interface ForslagPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ForslagPage({ params }: ForslagPageProps): React.JSX.Element {
  const resolvedParams = React.use(params);
  const forslagId = parseInt(resolvedParams.id);
  
  if (isNaN(forslagId)) {
    notFound();
  }
  
  const forslag = mockForslag.find(p => p.id === forslagId);
  
  if (!forslag) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8">
      <div className="w-full max-w-2xl px-4">
        <BackButton />
        <ForslagDetail forslag={forslag} />
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <div className="mb-6">
      <Link 
        href="/propositions" 
        className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka till förslag
      </Link>
    </div>
  );
}

function ForslagDetail({ forslag }: { forslag: Forslag }) {
  return (
    <article className="bg-white rounded-lg shadow-lg p-4 sm:p-6" role="article">
      <div className="flex-1 min-w-0">
        {/* Förslag Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Medborgarförslag #{forslag.id}
          </span>
          <Link 
            href={`/posts/${forslag.originalPostId}`}
            className="ml-3 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 underline"
          >
            Baserat på inlägg #{forslag.originalPostId}
          </Link>
        </div>
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {forslag.title}
        </h1>
        
        {/* Content Sections */}
        <div className="space-y-6">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {forslag.introduction}
            </p>
          </section>

          {/* Background */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Bakgrund</h2>
            <p className="text-gray-700 leading-relaxed">
              {forslag.background}
            </p>
          </section>

          {/* Arguments */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Viktiga anledningar</h2>
            <ul className="space-y-3">
              {forslag.arguments.map((argument, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">●</span>
                  <span className="text-gray-700 leading-relaxed">{argument}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Förslag</h2>
            <p className="text-gray-700 leading-relaxed">
              {forslag.conclusion}
            </p>
          </section>
        </div>
        
        {/* Action Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vad händer härnäst?</h3>
          <p className="text-gray-600 mb-4">
            Detta medborgarförslag kommer att granskas av experter och beslutsfattare. 
            Baserat på feedback och ytterligare analys kan det utvecklas vidare eller 
            implementeras som policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href={`/posts/${forslag.originalPostId}`}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Läs ursprunglig diskussion
            </Link>
            <Link 
              href="/voting"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors duration-200"
            >
              Rösta på förslaget
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
