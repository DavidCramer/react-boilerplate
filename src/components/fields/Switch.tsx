import React, { forwardRef } from 'react';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  checked = false,
  onChange,
  className = '',
  disabled = false,
  help,
  error,
  required = false,
  size = 'md'
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const hasError = Boolean(error);

  const sizeClasses = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: checked ? 'translate-x-4.5' : 'translate-x-0.5'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: checked ? 'translate-x-5.5' : 'translate-x-0.5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: checked ? 'translate-x-7.5' : 'translate-x-0.5'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-3">
        <div className="relative">
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
              ${currentSize.track} rounded-full cursor-pointer transition-colors py-0.5
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${hasError 
                ? 'bg-red-100 border border-red-300' 
                : checked
                  ? 'bg-blue-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }
            `}
            onClick={handleClick}
          >
            <div
              className={`
                ${currentSize.thumb} bg-white rounded-full shadow-sm transform transition-transform
                ${currentSize.translate}
              `}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {label && (
            <label
              className={`block text-sm font-medium cursor-pointer ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
              onClick={handleClick}
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

Switch.displayName = 'Switch';

export { Switch, type SwitchProps };
