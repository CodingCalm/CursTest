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

export function FormInput({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder,
  error,
  disabled = false,
  autoComplete,
  ariaDescribedBy,
}: FormInputProps): React.JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const getInputClasses = (): string => {
    const baseClasses =
      'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-gray-900 placeholder-gray-500';
    const stateClasses = error
      ? 'border-red-300 focus:ring-red-400 focus:border-red-400'
      : 'border-gray-300 focus:ring-gray-400 focus:border-gray-400';
    const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : '';

    return `${baseClasses} ${stateClasses} ${disabledClasses}`;
  };

  return (
    <div className='space-y-1'>
      <label
        htmlFor={id}
        className='block text-base font-semibold text-gray-900'
      >
        {label}
        {required && (
          <span className='text-red-600 ml-1' aria-label='obligatoriskt'>
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={getInputClasses()}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        aria-required={required}
      />

      {error && (
        <div
          id={`${id}-error`}
          className='text-sm text-red-700 font-medium'
          role='alert'
          aria-live='polite'
        >
          {error}
        </div>
      )}
    </div>
  );
}
