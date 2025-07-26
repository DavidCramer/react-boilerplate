import React, { forwardRef } from 'react';
import { Spinner } from './Spinner';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon
}, ref) => {
  const isDisabled = disabled || loading;

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-300',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-300'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading && (
        <Spinner size="md" className="-ml-1 mr-2" />
      )}
      
      {!loading && leftIcon && leftIcon}
      
      <span className={loading ? 'opacity-75' : ''}>
        {children}
      </span>
      
      {!loading && rightIcon && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';

export { Button, type ButtonProps };