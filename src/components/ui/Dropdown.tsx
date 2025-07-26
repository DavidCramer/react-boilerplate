import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
}

interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'bottom' | 'top';
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  destructive?: boolean;
}

interface DropdownSeparatorProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> & {
  Trigger: React.FC<DropdownTriggerProps>;
  Content: React.FC<DropdownContentProps>;
  Item: React.FC<DropdownItemProps>;
  Separator: React.FC<DropdownSeparatorProps>;
} = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current && 
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contextValue: DropdownContextValue = {
    isOpen,
    setIsOpen,
    triggerRef
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={`relative inline-block ${className}`}>
        {children}
        {isOpen && <div ref={contentRef} />}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  disabled = false
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownTrigger must be used within Dropdown');
  }

  const { isOpen, setIsOpen, triggerRef } = context;

  const variantClasses = {
    default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent border-transparent text-gray-700 hover:bg-gray-100'
  };

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
        rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isOpen ? 'ring-2 ring-blue-500' : ''}
        ${className}
      `}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      {children}
      <LuChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

const DropdownContent: React.FC<DropdownContentProps> = ({ 
  children, 
  className = '',
  align = 'start',
  side = 'bottom'
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownContent must be used within Dropdown');
  }

  const { isOpen, setIsOpen } = context;

  if (!isOpen) {
    return null;
  }

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0'
  };

  const sideClasses = {
    bottom: 'top-full mt-1',
    top: 'bottom-full mb-1'
  };

  return (
    <div
      className={`
        absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200
        bg-white p-1 shadow-lg
        ${alignClasses[align]} ${sideClasses[side]} ${className}
      `}
      role="menu"
      onClick={() => setIsOpen(false)}
    >
      {children}
    </div>
  );
};

const DropdownItem: React.FC<DropdownItemProps> = ({ 
  children, 
  onClick,
  disabled = false,
  destructive = false,
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && onClick) {
        onClick();
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={`
        w-full text-left px-2 py-1.5 text-sm rounded-sm transition-colors
        focus:outline-none focus:bg-gray-100
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:bg-gray-100'
        }
        ${destructive 
          ? 'text-red-600 hover:bg-red-50 focus:bg-red-50' 
          : 'text-gray-900'
        }
        ${className}
      `}
      role="menuitem"
    >
      {children}
    </button>
  );
};

const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className = '' }) => {
  return <div className={`-mx-1 my-1 h-px bg-gray-200 ${className}`} />;
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export { 
  Dropdown, 
  type DropdownProps, 
  type DropdownTriggerProps, 
  type DropdownContentProps, 
  type DropdownItemProps,
  type DropdownSeparatorProps
};