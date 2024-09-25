import React from "react";

interface SelectProps {
    id?: string;
    options: { label: string; value: string | number }[]; 
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    disabled?: boolean; 
};

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
};

export default Select;

