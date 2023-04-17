import { Button } from '../../common/Button/Button';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectToken, selectUserName } from '../../store/selectors';
import { logOutRequest } from '../../store/user/userSlice';

import { BUTTONS_TEXT } from '../../constants';
import { Logo } from './components/Logo/Logo';

import {
	StyledHeaderWrapper,
	StyledLogoWrapper,
	StyledUserInfoWrapper,
} from './Header.style';

const Header: React.FC = () => {
	const userName = useAppSelector(selectUserName);
	const token = useAppSelector(selectToken);

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		token && dispatch(logOutRequest(token));
	};

	return (
		<StyledHeaderWrapper>
			<StyledLogoWrapper>
				<Logo />
			</StyledLogoWrapper>
			{userName && (
				<StyledUserInfoWrapper>
					<p>{userName}</p>
					<Button text={BUTTONS_TEXT.OUT} onClick={handleLogout} />
				</StyledUserInfoWrapper>
			)}
		</StyledHeaderWrapper>
	);
};

export default Header;
