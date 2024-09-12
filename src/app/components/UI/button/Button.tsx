"USE CLIENT";
import React from 'react';

//creation of the interface for the atomic input component
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
}

//Component creation
const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children, className, disabled }) => {
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;