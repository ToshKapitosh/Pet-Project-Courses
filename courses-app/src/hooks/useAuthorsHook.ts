import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { selectAuthorsState } from '../store/selectors';
import { getAuthorsRequest } from '../store/authors/authorsSlice';

const useAuthorsHook = () => {
	const dispatch = useAppDispatch();
	const {
		authors,
		status: authorsStatus,
		error: authorsError,
	} = useAppSelector(selectAuthorsState);

	useEffect(() => {
		dispatch(getAuthorsRequest());
	}, [dispatch]);

	return {
		authors,
		status: authorsStatus,
		error: authorsError,
	};
};

export default useAuthorsHook;
