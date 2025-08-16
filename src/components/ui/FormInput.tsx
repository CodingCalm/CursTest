import React from 'react';

export interface FormInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  ariaDescribedBy?: string;
}

export class FormInput extends React.Component<FormInputProps> {
  /**
   * Handle input change with proper validation
   */
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  };

  /**
   * Get input classes based on state
   */
  private getInputClasses(): string {
    const baseClasses = "w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-900 placeholder-gray-500";
    const stateClasses = this.props.error 
      ? "border-red-300 focus:ring-red-400 focus:border-red-400" 
      : "border-gray-300 focus:ring-gray-400 focus:border-gray-400";
    const disabledClasses = this.props.disabled ? "bg-gray-50 cursor-not-allowed" : "";
    
    return `${baseClasses} ${stateClasses} ${disabledClasses}`;
  }

  render(): React.JSX.Element {
    const {
      id,
      label,
      type,
      value,
      required = false,
      placeholder,
      error,
      disabled = false,
      autoComplete,
      ariaDescribedBy
    } = this.props;

    return (
      <div className="space-y-1">
        <label 
          htmlFor={id}
          className="block text-base font-semibold text-gray-900"
        >
          {label}
          {required && <span className="text-red-600 ml-1" aria-label="obligatoriskt">*</span>}
        </label>
        
        <input
          id={id}
          type={type}
          value={value}
          onChange={this.handleChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={this.getInputClasses()}
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          aria-required={required}
        />
        
        {error && (
          <div 
            id={`${id}-error`}
            className="text-sm text-red-700 font-medium"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>
    );
  }
}
