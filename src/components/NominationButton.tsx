"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { LoginPrompt } from "@/components/ui/LoginPrompt";

interface NominationButtonProps {
  isNominated: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function NominationButton({ isNominated, onToggle, disabled = false }: NominationButtonProps): React.JSX.Element {
  const { data: session } = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const isAuthenticated = !!session;
  const isDisabled = disabled || !isAuthenticated;

  const handleToggle = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    onToggle();
  };

  return (
    <>
      <button 
        className={`flex items-center gap-1 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200 ${
          isNominated 
            ? `text-green-600 ${isDisabled ? '' : 'hover:text-green-700'}` 
            : `text-gray-500 ${isDisabled ? '' : 'hover:text-gray-700'}`
        } ${isDisabled ? 'cursor-default opacity-75' : ''}`}
        aria-label={isAuthenticated 
          ? (isNominated ? "Ta bort nominering" : "Nominera detta inlägg som förslag")
          : "Logga in för att nominera"
        }
        onClick={handleToggle}
        disabled={isDisabled}
      >
        <svg 
          className={`w-4 h-4 ${isNominated ? 'stroke-2' : 'stroke-1'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isNominated ? 3 : 2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-xs">{isNominated ? "Nominerad" : "Nominera"}</span>
      </button>
      
      <LoginPrompt 
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        action="nominera"
      />
    </>
  );
}
