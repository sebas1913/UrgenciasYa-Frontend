import React from "react";

interface InputProps {
	id?: string;
	type: string;
	placeholder?: string;
	name: string;
	value: string | number;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	disabled?: boolean; 
};

const Input: React.FC<InputProps> = ({ id, type, placeholder, name, value, onChange, className, disabled }) => {
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
