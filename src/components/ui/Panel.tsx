import React from 'react';

interface PanelProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface PanelHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface PanelBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface PanelFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

const Panel: React.FC<PanelProps> & {
  Header: React.FC<PanelHeaderProps>;
  Body: React.FC<PanelBodyProps>;
  Footer: React.FC<PanelFooterProps>;
} = ({ children, className = '', variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-100',
    outlined: 'bg-transparent border-2 border-gray-300'
  };

  return (
    <div className={`rounded-lg overflow-hidden ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

const PanelHeader: React.FC<PanelHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};

const PanelBody: React.FC<PanelBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

const PanelFooter: React.FC<PanelFooterProps> = ({ 
  children, 
  className = '', 
  align = 'right' 
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export { Panel, type PanelProps, type PanelHeaderProps, type PanelBodyProps, type PanelFooterProps };