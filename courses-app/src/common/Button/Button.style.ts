import styled from 'styled-components';

export const StyledButton = styled.button`
	border: 4px solid blue;
	padding: 10px 40px;
	margin: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	background-color: transparent;
	&:active,
	&:focus,
	&:hover {
		background-color: blue;
		color: white;
		cursor: pointer;
	}

	&:disabled {
		cursor: pointer;
		background-color: gray;
		box-shadow: none;

		&:hover,
		&:focus {
			cursor: not-allowed;
		}
	}
`;
