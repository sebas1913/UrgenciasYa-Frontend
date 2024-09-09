import React from "react";

// UI select component interface.

interface SelectProps {
    options: { label: string; value: string | number }[]; // select options with its label and its value.
    value?: string | number; // selected value.
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // useState.
    className?: string;
    disabled?: boolean; 
}

// UI select component.

const Select : React.FC<SelectProps> = ({ options, value, onChange, className, disabled }) => {
    return (
        <select
          value={value}
          onChange={onChange}
          className={className}
          disabled={disabled}
        >
        {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ))}
        </select>
    );
}

export default Select;

