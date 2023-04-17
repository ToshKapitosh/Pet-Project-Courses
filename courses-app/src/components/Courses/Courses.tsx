import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BUTTONS_TEXT } from '../../constants';
import { CourseType } from '../../types';

import { Button } from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import { StyledCourses, StyledHeadingCourses } from './Courses.style';

import useCoursesHook from '../../hooks/useCoursesHook';
import useUserHook from '../../hooks/useUserHook';

import Loader from '../../common/Loader/Loader';

const Courses: React.FC = () => {
	const {
		courses,
		error: coursesError,
		status: coursesLoading,
	} = useCoursesHook();
	const { isAdmin } = useUserHook();

	const [filteredCourses, setFilteredCourses] = useState(courses);

	const navigate = useNavigate();

	const addingCourseHandler = () => {
		navigate('/courses/add');
	};

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	const filteringCoursesHandler = (courses: CourseType[]) => {
		setFilteredCourses(courses);
	};

	return (
		<StyledCourses>
			<StyledHeadingCourses>
				<SearchBar onSearch={filteringCoursesHandler} />
				{isAdmin && (
					<Button text={BUTTONS_TEXT.ADD} onClick={addingCourseHandler} />
				)}
			</StyledHeadingCourses>
			{coursesLoading && <Loader />}
			{coursesError && <p>Ooops! It's an error: {coursesError} </p>}
			{!coursesLoading && !coursesError && filteredCourses.length ? (
				filteredCourses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))
			) : (
				<p>Sorry, i can't find anything</p>
			)}
		</StyledCourses>
	);
};

export default Courses;
