import React from "react";

// UI input component interface.

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean; // input able 'TRUE' or disabled 'FALSE'.
};

// input component.

const Input: React.FC<InputProps> = ( { type, placeholder, value, onChange, className, disabled }) => {
    return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
      );
};

export default Input;
