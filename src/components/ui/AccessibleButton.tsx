import React from 'react';

export interface AccessibleButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
}

export class AccessibleButton extends React.Component<AccessibleButtonProps> {
  /**
   * Handle button click with proper accessibility
   */
  private handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (this.props.disabled || this.props.loading) {
      e.preventDefault();
      return;
    }
    
    this.props.onClick?.();
  };

  /**
   * Get button classes based on variant and state
   */
  private getButtonClasses(): string {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const variantClasses = {
      primary: "bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-400",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400"
    };

    const size = this.props.size || 'md';
    const variant = this.props.variant || 'primary';

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${this.props.className || ''}`;
  }

  render(): React.JSX.Element {
    const {
      type = 'button',
      disabled = false,
      loading = false,
      children,
      ariaLabel,
      ariaDescribedBy,
      ariaExpanded,
      ariaControls
    } = this.props;

    return (
      <button
        type={type}
        disabled={disabled || loading}
        onClick={this.handleClick}
        className={this.getButtonClasses()}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-busy={loading}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
}
