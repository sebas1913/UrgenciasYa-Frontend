import React from "react";

// UI input component interface.

interface InputProps {
    id?: string;
    type: string;
    placeholder?: string;
    name: string;
    value: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean; // input able 'TRUE' or disabled 'FALSE'.
};

// UI input component.

const Input: React.FC<InputProps> = ( { id, type, placeholder, name, value, onChange, className, disabled }) => {
    return (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
      );
};

export default Input;
