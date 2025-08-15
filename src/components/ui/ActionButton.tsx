"use client";

import React from "react";

interface ActionButtonProps {
  icon: string;
  label: string;
  shortLabel: string;
  ariaLabel: string;
  onClick?: () => void;
  isActive?: boolean;
  variant?: 'card' | 'detail';
}

export function ActionButton({ 
  icon, 
  label, 
  shortLabel,
  ariaLabel,
  onClick,
  isActive = false,
  variant = 'card'
}: ActionButtonProps): React.JSX.Element {
  const isDetail = variant === 'detail';
  
  return (
    <button 
      className={`flex items-center gap-1 ${isDetail ? 'sm:gap-2' : ''} p-1 ${isDetail ? 'sm:p-2' : ''} rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 transition-colors duration-200 flex-shrink-0 ${
        isActive 
          ? 'text-green-600 hover:text-green-700' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg 
        className={`${isDetail ? 'w-3 h-3 sm:w-5 sm:h-5' : 'w-3 h-3 sm:w-4 sm:h-4'} stroke-1`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <span className="hidden xs:inline">{shortLabel}</span>
      <span className="xs:hidden sm:inline">{label}</span>
    </button>
  );
}
