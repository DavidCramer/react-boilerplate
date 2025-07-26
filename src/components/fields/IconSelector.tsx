import React, { useState, useEffect, useRef } from 'react';
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";

interface SvgIcon {
  id: string;
  viewBox: string;
  innerHTML: string;
  source: string;
  element?: Element;
  isDemo?: boolean;
}

interface IconSelectorProps {
  options: SvgIcon[];
  label?: string;
  value?: SvgIcon | null;
  onChange?: (icon: SvgIcon | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  help?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  label,
  options,
  value,
  onChange,
  help,
  placeholder = "Select an icon...",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredIcons, setFilteredIcons] = useState<SvgIcon[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = options.filter(icon =>
      icon.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIcons(filtered);
    setHighlightedIndex(-1);
  }, [searchTerm, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current && filteredIcons.length > 0) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex, filteredIcons.length]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (filteredIcons.length > 0) {
          setHighlightedIndex(prev =>
            prev < filteredIcons.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (filteredIcons.length > 0) {
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredIcons.length - 1
          );
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredIcons[highlightedIndex]) {
          handleSelect(filteredIcons[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        break;
    }
  };

  const handleSelect = (icon: SvgIcon) => {
    onChange?.(icon);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const selectedIcon = value;
  const displayText = selectedIcon ? selectedIcon.id : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {/* Trigger Button */}
      <button
        ref={inputRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2 text-left 
          border border-gray-300 rounded-md shadow-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:border-gray-400 cursor-pointer'}
          ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedIcon && (
            <svg
              viewBox={selectedIcon.viewBox}
              className="w-4 h-4 text-gray-600 flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: selectedIcon.innerHTML }}
            />
          )}
          <span className={`truncate ${!selectedIcon ? 'text-gray-500' : 'text-gray-900'}`}>
            {displayText}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {selectedIcon && !disabled && (
            <button
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-100 rounded"
              tabIndex={-1}
              type="button"
            >
              <LuX className="w-3 h-3 text-gray-400"/>
            </button>
          )}
          <LuChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <LuSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* Icon List */}
          <div
            ref={listRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
          >
            {filteredIcons.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">
                No icons found
              </div>
            ) : (
              filteredIcons.map((icon, index) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => handleSelect(icon)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left text-sm
                    hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                    ${index === highlightedIndex ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                    ${selectedIcon?.id === icon.id ? 'bg-blue-100 text-blue-900' : ''}
                  `}
                  role="option"
                  aria-selected={selectedIcon?.id === icon.id}
                >
                  <svg
                    viewBox={icon.viewBox}
                    className="w-4 h-4 flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: icon.innerHTML }}
                  />
                  <span className="truncate">{icon.id}</span>
                  {icon.isDemo && (
                    <span className="text-xs text-gray-400 ml-auto">demo</span>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
            {options.length} icons available
          </div>
        </div>
      )}
      { help && (
        <div className="pt-2 text-xs text-gray-500">
          {help}
        </div>
      )}
    </div>
  );
};

export { IconSelector, type SvgIcon, type IconSelectorProps };
