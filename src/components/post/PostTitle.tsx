"use client";

import React from "react";
import Link from "next/link";

interface PostTitleProps {
  id?: number;
  title: string;
  variant?: 'card' | 'detail';
}

export function PostTitle({ 
  id, 
  title, 
  variant = 'card' 
}: PostTitleProps): React.JSX.Element {
  const isDetail = variant === 'detail';
  
  if (isDetail) {
    return (
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
    );
  }
  
  return (
    <Link href={`/posts/${id}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded transition-all duration-200">
        {title}
      </h3>
    </Link>
  );
}
