"use client";

import React from "react";
import Link from "next/link";

interface ForslagCardProps {
  id: number;
  title: string;
  introduction: string;
  background: string;
  arguments: string[];
  conclusion: string;
  originalPostId: number;
}

export function ForslagCard({
  id,
  title,
  introduction,
  originalPostId
}: ForslagCardProps): React.JSX.Element {
  return (
    <article 
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 p-4" 
      role="article"
      aria-labelledby={`forslag-title-${id}`}
    >
      <div className="flex-1 min-w-0">
        {/* Förslag Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Medborgarförslag
          </span>
          <Link 
            href={`/posts/${originalPostId}`}
            className="ml-2 text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200 underline"
          >
            Baserat på inlägg #{originalPostId}
          </Link>
        </div>
        
        {/* Title */}
        <Link href={`/propositions/${id}`}>
          <h3 
            id={`forslag-title-${id}`}
            className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
            {title}
          </h3>
        </Link>
        
        {/* Content Preview */}
        <p className="text-gray-700 leading-relaxed">
          {introduction}
        </p>
      </div>
    </article>
  );
}
