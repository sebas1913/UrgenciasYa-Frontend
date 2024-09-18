import React, { ReactNode } from "react";

interface LabelProps {
    htmlFor : string;
    className? : string;
    children: ReactNode;
};

const Label : React.FC<LabelProps> = ({ children, htmlFor, className}) => {
    return (
        <label htmlFor={htmlFor} className={className}>{children}</label>
    );
};

export default Label;