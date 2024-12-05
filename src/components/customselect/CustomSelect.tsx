import React, { useState, useEffect, useRef } from 'react';
import './customSelect.css';

interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minWidth?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  minWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    if (!disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`custom_select ${disabled ? 'disabled' : ''}`}
      ref={selectRef}
      style={{ minWidth: minWidth ? minWidth : '' }}
    >
      <div
        className={`custom_select_trigger ${isOpen ? 'open' : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
      >
        <span>{value || placeholder}</span>
        <div className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && !disabled && (
        <div className="custom_select_options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`custom_select_option ${
                value === option ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
