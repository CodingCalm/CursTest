'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { LoginPrompt } from './LoginPrompt';

interface AuthenticatedButtonProps {
  children: React.ReactNode;
  onAuthenticatedAction: () => void;
  actionName: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  onClick?: () => void;
  [key: string]: any; // Allow other button props
}

export function AuthenticatedButton({
  children,
  onAuthenticatedAction,
  actionName,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  onClick,
  ...buttonProps
}: AuthenticatedButtonProps): React.JSX.Element {
  const { data: session } = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const isAuthenticated = !!session;
  const isDisabled = disabled || !isAuthenticated;

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    onAuthenticatedAction();
  };

  const defaultAriaLabel = isAuthenticated
    ? ariaLabel
    : `Logga in för att ${actionName}`;

  return (
    <>
      <button
        {...buttonProps}
        className={className}
        aria-label={defaultAriaLabel}
        aria-pressed={ariaPressed}
        onClick={handleClick}
        disabled={isDisabled}
      >
        {children}
      </button>

      <LoginPrompt
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        action={actionName as 'nominera' | 'rösta'}
      />
    </>
  );
}
