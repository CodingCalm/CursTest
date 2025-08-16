"use client";

import React, { useState } from "react";

interface ExpandableSectionProps {
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function ExpandableSection({ 
  title, 
  count, 
  children, 
  defaultExpanded = false,
  className = ""
}: ExpandableSectionProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayTitle = count !== undefined ? `${title} (${count})` : title;

  return (
    <div className={`mt-6 ${className}`}>
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 hover:bg-gray-50"
        aria-expanded={isExpanded}
        aria-controls="expandable-content"
      >
        <span className="text-lg font-semibold text-gray-900">
          {displayTitle}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id="expandable-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
