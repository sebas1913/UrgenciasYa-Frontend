import React from "react";

interface TextAreaProps {
    id?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    cols?: number;
    maxLength?: number;
    className?: string;
};

const TextArea : React.FC<TextAreaProps> = ({ id, value, onChange, placeholder, rows, cols, maxLength, className }) => {

    return (
        <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        className={className}
      />
    );
};

export default TextArea;