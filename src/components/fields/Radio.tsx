import React, { forwardRef } from 'react';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  required?: boolean;
  direction?: 'vertical' | 'horizontal';
  name?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  options,
  value,
  onChange,
  className = '',
  disabled = false,
  help,
  error,
  required = false,
  direction = 'vertical',
  name
}, ref) => {
  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  const hasError = Boolean(error);
  const radioName = name || `radio-${Math.random().toString(36).substr(2, 9)}`;

  const containerClass = direction === 'horizontal' 
    ? 'flex flex-wrap gap-4' 
    : 'space-y-2';

  return (
    <div className={`${className}`}>
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      
      <div className={containerClass}>
        {options.map((option, index) => {
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          
          return (
            <div key={option.value} className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <input
                  ref={index === 0 ? ref : undefined}
                  type="radio"
                  name={radioName}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value)}
                  disabled={isDisabled}
                  required={required}
                  className="sr-only"
                />
                <div
                  className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
                    ${hasError 
                      ? 'border-red-300' 
                      : isChecked
                        ? 'border-blue-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }
                  `}
                  onClick={() => !isDisabled && handleChange(option.value)}
                >
                  {isChecked && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
              
              <label 
                className={`text-sm cursor-pointer ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}
                onClick={() => !isDisabled && handleChange(option.value)}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      
      {help && !error && (
        <div className="mt-2 text-sm text-gray-500">
          {help}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export { Radio, type RadioProps, type RadioOption };