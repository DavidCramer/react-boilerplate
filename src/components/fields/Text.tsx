import React, { forwardRef } from 'react';

interface TextProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number';
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

const Text = forwardRef<HTMLInputElement, TextProps>(({
  label,
  value = '',
  onChange,
  placeholder,
  className = '',
  disabled = false,
  help,
  error,
  type = 'text',
  required = false,
  autoComplete,
  maxLength,
  minLength
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const hasError = Boolean(error);

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}
          ${hasError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      />
      
      {error && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="mt-1 text-sm text-gray-500">
          {help}
        </div>
      )}
    </div>
  );
});

Text.displayName = 'Text';

export { Text, type TextProps };