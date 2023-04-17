import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { getCoursesRequest } from '../store/courses/coursesSlice';
import { selectCoursesState } from '../store/selectors';

const useCoursesHook = () => {
	const dispatch = useAppDispatch();
	const { courses, status, error } = useAppSelector(selectCoursesState);

	useEffect(() => {
		dispatch(getCoursesRequest());
	}, [dispatch]);

	return {
		courses,
		status,
		error,
	};
};

export default useCoursesHook;
