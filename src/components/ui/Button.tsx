import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-pressed'?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  ...props
}: ButtonProps): React.JSX.Element {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      {...props}
    >
      {children}
    </button>
  );
}
