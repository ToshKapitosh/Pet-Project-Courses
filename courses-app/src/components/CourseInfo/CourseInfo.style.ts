import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCardWrapper = styled.div`
	border: 4px solid green;
	padding: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

export const StyledTitle = styled.h2`
	font-size: 30px;
	font-weight: bold;
`;

export const StyledText = styled.p`
	width: 60%;
	font-size: 26px;
`;

export const StyledDataWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 40px;
`;

export const StyledInnerWrapper = styled.div`
	li {
		list-style-type: none;
	}
`;

export const StyledLink = styled(Link)`
	align-self: start;
	text-decoration: none;
`;
