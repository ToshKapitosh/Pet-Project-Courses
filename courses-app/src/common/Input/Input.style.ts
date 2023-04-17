import styled from 'styled-components';

export const StyledInputWrapper = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	text-align: left;
`;

export const StyledInput = styled.input`
	padding: 15px;
	border: 4px solid yellow;
	&:focus {
		border: 4px solid green;
	}
`;
