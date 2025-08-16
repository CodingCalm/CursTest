"use client";

import React from "react";
import { ForslagCard } from "@/components";
import { mockForslag } from "@/data";

export default function PropositionsPage(): React.JSX.Element {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Förslag</h1>
          <p className="text-gray-600">Förslag baserade på nominerade inlägg från torget</p>
        </header>
        
        <div className="space-y-6">
          {mockForslag.map((forslag) => (
            <ForslagCard 
              key={forslag.id}
              id={forslag.id}
              title={forslag.title}
              introduction={forslag.introduction}
              summary={forslag.summary}
              background={forslag.background}
              arguments={forslag.arguments}
              conclusion={forslag.conclusion}
              originalPostId={forslag.originalPostId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
