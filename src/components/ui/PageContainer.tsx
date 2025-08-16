import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  centered?: boolean;
}

export function PageContainer({ 
  children, 
  className = "",
  maxWidth = '2xl',
  centered = true
}: PageContainerProps): React.JSX.Element {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  };

  return (
    <div className={`bg-gray-50 min-h-screen flex justify-center items-start pt-8 pb-8 ${className}`}>
      <div className={`w-full ${maxWidthClasses[maxWidth]} px-4 ${centered ? 'mx-auto' : ''}`}>
        {children}
      </div>
    </div>
  );
}
