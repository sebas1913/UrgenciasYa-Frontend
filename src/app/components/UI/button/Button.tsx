"USE CLIENT";
import React from 'react';

//creation of the interface for the atomic input component
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
}

//Component creation
const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;