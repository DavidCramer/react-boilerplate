import React, { useState, useEffect, useRef, forwardRef, useMemo } from 'react';
import { LuChevronDown, LuX, LuCheck } from "react-icons/lu";

interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  label?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  help?: string;
  error?: string;
  required?: boolean;
  allowClear?: boolean;
  filterFunction?: (options: AutocompleteOption[], searchTerm: string) => AutocompleteOption[];
  noOptionsText?: string;
  maxDisplayOptions?: number;
  multiple?: boolean;
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
  options,
  label,
  value = '',
  onChange,
  placeholder = "Type to search...",
  className = '',
  disabled = false,
  help,
  error,
  required = false,
  allowClear = true,
  filterFunction,
  noOptionsText = "No options found",
  maxDisplayOptions = 10,
  multiple = false
}, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Normalize value to always work with arrays internally for consistency
  const selectedValues = useMemo(() => {
    return multiple 
      ? (Array.isArray(value) ? value : (value ? [value] : []))
      : (Array.isArray(value) ? value : (value ? [value] : []));
  }, [value, multiple]);

  const selectedOptions = selectedValues.map(val => 
    options.find(option => option.value === val)
  ).filter(Boolean) as AutocompleteOption[];

  // Update input value based on selection mode
  useEffect(() => {
    if (multiple) {
      // For multiple, input should be clear for searching
      if (!isOpen) {
        setInputValue('');
        setSearchTerm('');
      }
    } else {
      // For single, show selected option label
      const selectedOption = selectedOptions[0];
      if (selectedOption && !isOpen) {
        setInputValue(selectedOption.label);
        setSearchTerm('');
      } else if (!selectedOption) {
        setInputValue('');
      }
    }
  }, [selectedOptions, isOpen, multiple]);

  // Filter options based on search term and exclude already selected items in multiple mode
  useEffect(() => {
    if (!isOpen) {
      setFilteredOptions([]);
      return;
    }

    let filtered: AutocompleteOption[];
    
    if (filterFunction) {
      filtered = filterFunction(options, searchTerm);
    } else {
      filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // In multiple mode, exclude already selected options
    if (multiple) {
      filtered = filtered.filter(option => !selectedValues.includes(option.value));
    }

    filtered = filtered.slice(0, maxDisplayOptions);
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [searchTerm, options, isOpen, filterFunction, maxDisplayOptions, multiple, selectedValues]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    if (multiple) {
      setInputValue('');
      setSearchTerm('');
    } else {
      const selectedOption = selectedOptions[0];
      if (selectedOption) {
        setInputValue(selectedOption.label);
        setSearchTerm('');
      } else {
        setInputValue('');
        setSearchTerm('');
      }
    }
  }, [selectedOptions, multiple]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSearchTerm(newValue);
    setIsOpen(true);
    
    // If input is cleared and not multiple, clear selection
    if (!newValue && !multiple && selectedValues.length > 0) {
      onChange?.(multiple ? [] : '');
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      if (multiple) {
        setSearchTerm(inputValue);
      } else {
        setSearchTerm(inputValue);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (filteredOptions.length > 0) {
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (filteredOptions.length > 0) {
          setHighlightedIndex(prev =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        handleClose();
        break;
      case 'Backspace':
        // In multiple mode, if input is empty, remove last selected item
        if (multiple && !searchTerm && selectedValues.length > 0) {
          e.preventDefault();
          const newValues = selectedValues.slice(0, -1);
          onChange?.(newValues);
        }
        break;
    }
  };

  const handleSelect = (option: AutocompleteOption) => {
    if (!option.disabled) {
      if (multiple) {
        const newValues = [...selectedValues, option.value];
        onChange?.(newValues);
        setInputValue('');
        setSearchTerm('');
        // Keep dropdown open for multiple selection
      } else {
        onChange?.(option.value);
        setInputValue(option.label);
        setIsOpen(false);
        setSearchTerm('');
      }
      setHighlightedIndex(-1);
    }
  };

  const handleRemoveItem = (valueToRemove: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (multiple) {
      const newValues = selectedValues.filter(val => val !== valueToRemove);
      onChange?.(newValues);
    } else {
      onChange?.('');
      setInputValue('');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
    setInputValue('');
    setSearchTerm('');
    ref?.current?.focus();
  };

  const hasError = Boolean(error);
  const hasSelectedItems = selectedValues.length > 0;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className={`
        w-full border rounded-md shadow-sm bg-white min-h-[38px] flex flex-wrap items-center gap-1 p-1
        focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
        ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-text'}
        ${hasError
          ? 'border-red-300 focus-within:ring-red-500 focus-within:border-red-500'
          : 'border-gray-300 hover:border-gray-400'
        }
        ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
      `} onClick={() => !disabled && ref?.current?.focus()}>
        
        {/* Selected Items (Multiple Mode) */}
        {multiple && selectedOptions.map((option) => (
          <div
            key={option.value}
            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm"
          >
            <span className="truncate max-w-[120px]">{option.label}</span>
            {!disabled && (
              <button
                onClick={(e) => handleRemoveItem(option.value, e)}
                className="hover:bg-blue-200 rounded p-0.5"
                type="button"
                tabIndex={-1}
              >
                <LuX className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={multiple && hasSelectedItems ? "" : placeholder}
          disabled={disabled}
          required={required}
          className={`
            flex-1 min-w-[120px] px-2 py-1 border-none outline-none bg-transparent
            ${disabled ? 'cursor-not-allowed' : ''}
            ${multiple && hasSelectedItems ? 'placeholder:opacity-0' : ''}
          `}
        />
        
        {/* Clear and Chevron */}
        <div className="flex items-center gap-1 pr-1">
          {allowClear && hasSelectedItems && !disabled && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded"
              tabIndex={-1}
              type="button"
            >
              <LuX className="w-3 h-3 text-gray-400"/>
            </button>
          )}
          <LuChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Options List */}
          <div
            ref={listRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">
                {noOptionsText}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 text-left text-sm
                      hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                      ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                      ${index === highlightedIndex ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                      ${isSelected ? 'bg-blue-100 text-blue-900' : ''}
                    `}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && !multiple && (
                      <LuCheck className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          {filteredOptions.length > 0 && (
            <div className="p-2 border-t border-gray-200 text-xs text-gray-500">
              {filteredOptions.length} of {options.length} options
              {multiple && selectedValues.length > 0 && (
                <span className="ml-2">• {selectedValues.length} selected</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Help */}
      {help && !error && (
        <div className="mt-1 text-sm text-gray-500">
          {help}
        </div>
      )}
    </div>
  );
});

Autocomplete.displayName = 'Autocomplete';

export { Autocomplete, type AutocompleteProps, type AutocompleteOption };