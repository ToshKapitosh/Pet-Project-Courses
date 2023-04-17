import { InputProps } from '../../types';
import { StyledInput, StyledInputWrapper } from './Input.style';

export const Input = ({
	placeholder,
	value,
	label,
	type,
	name,
	htmlFor,
	onChange,
}: InputProps) => {
	return (
		<StyledInputWrapper>
			{label && <label htmlFor={htmlFor}>{label}</label>}
			<StyledInput
				id={htmlFor}
				name={name}
				type={type || 'text'}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</StyledInputWrapper>
	);
};
