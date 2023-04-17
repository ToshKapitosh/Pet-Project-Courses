import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { BUTTONS_TEXT } from '../../constants';

import {
	StyledDescription,
	StyledPageWrapper,
	StyledTitle,
} from './NotFound.styles';

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	const onClickBackHandler = () => {
		navigate('/', { replace: true });
	};

	return (
		<StyledPageWrapper>
			<StyledTitle>Page Not Found</StyledTitle>
			<StyledDescription>
				Looks like you've followed a broken link or entered a URL that doesn't
				exist on this site.
			</StyledDescription>
			<Button text={BUTTONS_TEXT.RETURN} onClick={onClickBackHandler} />
		</StyledPageWrapper>
	);
};

export default NotFound;
