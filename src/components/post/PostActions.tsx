"use client";

import React from "react";

interface PostActionsProps {
  comments?: number;
  variant?: 'card' | 'detail';
}

export function PostActions({ 
  comments, 
  variant = 'card' 
}: PostActionsProps): React.JSX.Element {
  // Currently returns empty fragment as per user requirements
  // This component can be extended in the future for additional actions
  return <></>;
}
