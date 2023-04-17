import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { selectUserState } from '../store/selectors';
import { getCurrentUserRequest } from '../store/user/userSlice';

const useUserHook = () => {
	const dispatch = useAppDispatch();
	const { isAuth, name, token, isAdmin, status, error } =
		useAppSelector(selectUserState);

	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (token) {
			dispatch(getCurrentUserRequest(token));
		} else if (!token && localToken) {
			dispatch(getCurrentUserRequest(localToken));
		}
	}, [dispatch, token]);

	return {
		isAuth,
		name,
		token,
		isAdmin,
		status,
		error,
	};
};

export default useUserHook;
