import styled from 'styled-components';

export const StyledHeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 4px solid coral;
	padding: 20px;
`;

export const StyledLogoWrapper = styled.div`
	height: 100px;
	text-align: center;
	img {
		width: auto;
		height: 100%;
		object-fit: cover;
	}
`;

export const StyledUserInfoWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	gap: 40px;
`;
