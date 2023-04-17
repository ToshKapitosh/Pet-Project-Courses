import { ButtonProps } from '../../types';
import { StyledButton } from './Button.style';

export const Button = ({ type = 'submit', text, onClick }: ButtonProps) => (
	<StyledButton type={type} onClick={onClick}>
		{text}
	</StyledButton>
);
