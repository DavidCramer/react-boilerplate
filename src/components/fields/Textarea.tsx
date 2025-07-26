import React, { forwardRef } from 'react';

interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  value = '',
  onChange,
  placeholder,
  className = '',
  disabled = false,
  help,
  error,
  required = false,
  rows = 3,
  maxLength,
  minLength,
  resize = 'vertical'
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const hasError = Boolean(error);
  const showCharCount = Boolean(maxLength);
  const charCount = value.length;

  const resizeClass = {
    none: 'resize-none',
    both: 'resize',
    horizontal: 'resize-x',
    vertical: 'resize-y'
  }[resize];

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        minLength={minLength}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm ${resizeClass}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}
          ${hasError 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      />
      
      {showCharCount && (
        <div className="mt-1 flex justify-between items-start">
          <div>
            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}
            {help && !error && (
              <div className="text-sm text-gray-500">
                {help}
              </div>
            )}
          </div>
          <div className={`text-xs ${charCount > (maxLength || 0) ? 'text-red-500' : 'text-gray-400'}`}>
            {charCount}{maxLength && `/${maxLength}`}
          </div>
        </div>
      )}
      
      {!showCharCount && error && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
      
      {!showCharCount && help && !error && (
        <div className="mt-1 text-sm text-gray-500">
          {help}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps };