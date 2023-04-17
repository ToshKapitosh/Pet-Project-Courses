import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 50px;
	gap: 20px;
	background: rgba(0, 0, 0, 0.2);
`;

export const StyledTitle = styled.h1`
	font-size: 30px;
`;

export const StyledDescription = styled.p`
	max-width: 400px;
	font-size: 24px;
	text-align: center;
`;
