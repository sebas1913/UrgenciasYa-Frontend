import React, { ReactNode } from "react";


//Interface for the Form component properties
interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
    title?: string; 
    children: ReactNode; //Render input and button component
};

//Component creation
const Form: React.FC<FormProps> = ({ onSubmit, className, title, children }) => {
    return (
        <form onSubmit={onSubmit} className={className}>
            {title && <h1>{title}</h1>}
            {children}
        </form>
    );
};

export default Form;
