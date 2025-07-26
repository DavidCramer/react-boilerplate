import React, { forwardRef } from 'react';
import { LuCheck } from 'react-icons/lu';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  required?: boolean;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
  help,
  error,
  required = false,
  indeterminate = false
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const hasError = Boolean(error);

  return (
    <div className={`${className}`}>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className="sr-only"
          />
          <div
            className={`
              w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${hasError 
                ? 'border-red-300' 
                : checked || indeterminate
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onClick={() => !disabled && onChange?.(!checked)}
          >
            {(checked || indeterminate) && (
              <LuCheck 
                className={`w-3 h-3 text-white ${indeterminate ? 'opacity-50' : ''}`} 
              />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          {label && (
            <label 
              className={`block text-sm font-medium cursor-pointer ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
              onClick={() => !disabled && onChange?.(!checked)}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
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
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox, type CheckboxProps };