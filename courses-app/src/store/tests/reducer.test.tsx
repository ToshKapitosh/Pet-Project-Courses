import { mockCourses } from '../../constants';
import { CourseType } from '../../types';
import {
	coursesReducer,
	initialState,
	getCoursesRequest,
	addCourseRequest,
} from '../courses/coursesSlice';

describe('coursesReducer', () => {
	it('should return the initial state', () => {
		const action = {
			type: undefined,
		};
		expect(coursesReducer(undefined, action)).toEqual(initialState);
	});

	it('should handle addCourseRequest and returns new state', () => {
		const newCourse: CourseType = mockCourses[0];
		const newState = coursesReducer(
			initialState,
			addCourseRequest.fulfilled(
				{ successful: true, result: newCourse },
				'token',
				{
					course: newCourse,
					token: 'token',
				}
			)
		);
		expect(newState.courses.length).toEqual(1);
		expect(newState.courses[0]).toEqual(newCourse);
		expect(newState.status).toBeFalsy();
	});

	it('should handle getCoursesRequest and returns new state', () => {
		const newState = coursesReducer(
			initialState,
			getCoursesRequest.fulfilled(mockCourses, '')
		);
		expect(newState.courses).toEqual(mockCourses);
		expect(newState.status).toBeFalsy();
	});
});
