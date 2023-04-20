// import { CoursesAPI } from '../../helpers/api';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { coursesReducer } from '../courses/coursesSlice';
// import {
// 	getCoursesRequest,
// 	addCourseRequest,
// 	deleteCourseRequest,
// } from '../courses/coursesSlice';

// jest.mock('../../helpers/api');
// const mockStore = configureMockStore([thunk]);

// describe('coursesReducer', () => {
// 	let store = mockStore({
// 		courses: [],
// 		status: false,
// 		error: null,
// 	});
// 	beforeEach(() => {
// 		store = mockStore({
// 			courses: [],
// 			status: false,
// 			error: null,
// 		});
// 	});

// 	afterEach(() => {
// 		jest.resetAllMocks();
// 	});
// 	it('should return the initial state', () => {
// 		expect(coursesReducer(undefined, {} as any)).toEqual({
// 			courses: [],
// 			status: false,
// 			error: null,
// 		});
// 	});

// 	it('should handle adding new course and returns new state', () => {
// 		const mockCourse = {
// 			id: '1',
// 			title: 'Test Course',
// 			description: 'This is a test course',
// 		};

// 		const mockResponse = { result: { id: 1, name: 'Math' } };
//     	CoursesAPI.addCourse.mockResolvedValueOnce(mockResponse);

// 		const expectedState = {
// 			courses: [mockCourse],
// 			status: false,
// 			error: null,
// 		};

// 		store.dispatch(
// 			addCourseRequest.fulfilled({
// 				result: mockCourse,
// 			} as any)
// 		);

// 		expect(store.getActions()[0]).toEqual(
// 			addCourseRequest.fulfilled({
// 				result: mockCourse,
// 			} as any)
// 		);

// 		expect(store.getState().coursesReducer).toEqual(expectedState);
// 	});

// 	it('should handle getting all courses and returns new state', () => {
// 		const store = mockStore({
// 			courses: [],
// 			status: false,
// 			error: null,
// 		});

// 		const mockCourses = [
// 			{
// 				id: '1',
// 				title: 'Test Course 1',
// 				description: 'This is a test course 1',
// 				creationDate: '20/11/2020',
// 				duration: 120,
// 				authors: ['132refdtx', '243546eertd'],
// 			},
// 			{
// 				id: '2',
// 				title: 'Test Course 2',
// 				description: 'This is a test course 2',
// 				creationDate: '11/10/2021',
// 				duration: 120,
// 				authors: ['132r456dtx', '243546e123td'],
// 			},
// 		];

// 		const expectedState = {
// 			courses: mockCourses,
// 			status: false,
// 			error: null,
// 		};

// 		store.dispatch(
// 			getCoursesRequest.fulfilled(mockCourses, '' as any, undefined as any)
// 		);

// 		expect(store.getActions()[0]).toEqual(
// 			getCoursesRequest.fulfilled(mockCourses, '' as any, undefined as any)
// 		);

// 		expect(store.getState().coursesReducer).toEqual(expectedState);
// 	});

// 	it('should handle deleting a course and returns new state', () => {
// 		const store = mockStore({
// 			courses: [
// 				{
// 					id: '1',
// 					title: 'Test Course 1',
// 					description: 'This is a test course 1',
// 				},
// 				{
// 					id: '2',
// 					title: 'Test Course 2',
// 					description: 'This is a test course 2',
// 				},
// 			],
// 			status: false,
// 			error: null,
// 		});

// 		const courseId = '1';

// 		const expectedState = {
// 			courses: [
// 				{
// 					id: '2',
// 					title: 'Test Course 2',
// 					description: 'This is a test course 2',
// 				},
// 			],
// 			status: false,
// 			error: null,
// 		};

// 		store.dispatch(
// 			deleteCourseRequest.fulfilled(courseId, '' as any, undefined as any)
// 		);

// 		expect(store.getActions()[0]).toEqual(
// 			deleteCourseRequest.fulfilled(courseId, '' as any, undefined as any)
// 		);

// 		expect(store.getState().coursesReducer).toEqual(expectedState);
// 	});
// });

// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import {
//   coursesReducer,
//   initialState,
//   addCourseRequest,
//   getCoursesRequest,
//   deleteCourseRequest
// } from './coursesSlice';
// import { CoursesAPI } from '../../helpers/api';
// import { render } from '@testing-library/react';

// // 1. Mock the CoursesAPI module
// jest.mock('../../helpers/api');

// // 2. Create a mock store
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe('courses reducer', () => {
//   let store;
//   beforeEach(() => {
//     store = mockStore({ courses: initialState });
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it('should return the initial state', () => {
//     const action = { type: 'unknown' };
//     const state = coursesReducer(undefined, action);
//     expect(state).toEqual(initialState);
//   });

//   it('should handle adding new course and return new state', async () => {
//     const mockResponse = { result: { id: 1, name: 'Math' } };
//     CoursesAPI.addCourse.mockResolvedValueOnce(mockResponse);

//     const course = { name: 'Math' };
//     const token = 'token';
//     const expectedActions = [addCourseRequest.pending.type, addCourseRequest.fulfilled.type];
//     await store.dispatch(addCourseRequest({ course, token }));
//     const actions = store.getActions().map((action) => action.type);
//     const { courses } = store.getState();
//     expect(actions).toEqual(expectedActions);
//     expect(courses.courses).toEqual([mockResponse.result]);
//   });

//   it('should handle getting all courses and return new state', async () => {
//     const mockResponse = [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }];
//     CoursesAPI.getCourses.mockResolvedValueOnce({ result: mockResponse });

//     const expectedActions = [getCoursesRequest.pending.type, getCoursesRequest.fulfilled.type];
//     await store.dispatch(getCoursesRequest());
//     const actions = store.getActions().map((action) => action.type);
//     const { courses } = store.getState();
//     expect(actions).toEqual(expectedActions);
//     expect(courses.courses).toEqual(mockResponse);
//   });

//   it('should handle deleting course and return new state', async () => {
//     const mockResponse = { successful: true };
//     CoursesAPI.deleteCourse.mockResolvedValueOnce(mockResponse);

//     const id = '1';
//     const token = 'token';
//     const expectedActions = [deleteCourseRequest.pending.type, deleteCourseRequest.fulfilled.type];
//     await store.dispatch(deleteCourseRequest({ id, token }));
//     const actions = store.getActions().map((action) => action.type);
//     const { courses } = store.getState();
//     expect(actions).toEqual(expectedActions);
//     expect(courses.courses).toEqual([]);
//   });
// });

// import { addCourseRequest, coursesReducer, getCoursesRequest } from '../courses/coursesSlice';

// // import { addNewCourse, setCourses } from '../courses/actionCreators';

// import { mockedCoursesList } from '../../constants';

// const initialState: Course[] = [];

// describe('Courses reducer', () => {
// 	test('renders authors list', () => {
// 		expect(coursesReducer(undefined, { type: undefined })).toEqual(
// 			initialState
// 		);
// 	});

// 	test('handles creation of a new course and returns new state', (): void => {
// 		const course = mockedCoursesList[0];

// 		expect(coursesReducer(initialState, addCourseRequest(course))).toEqual([
// 			course,
// 		]);
// 	});

// 	test('handles getting the list of courses and returns new state', (): void => {
// 		expect(coursesReducer(initialState, getCoursesRequest(mockedCoursesList))).toEqual(
// 			mockedCoursesList
// 		);
// 	});
// });

// import { Course, CourseState, coursesReducer } from '../courses/reducer';

// import fetchMock from 'jest-fetch-mock';
// import { createAction } from '../../helpers/reducer/reducer.utils';
// import { COURSES_ACTION_TYPES } from '../courses/actionTypes';
// import { mockedState } from '../../constants';

// import { getAllCoursesFromAPI } from '../../servises';
// import { fetchCoursesSuccess } from '../courses/actionCreators';
// import { mockStore } from './mockStore';

// describe('Course reducer', () => {
// 	fetchMock.enableMocks();

// 	beforeEach((): void => {
// 		fetchMock.resetMocks();
// 	});

// 	it('should return the initial state', () => {
// 		expect(coursesReducer(undefined, { type: undefined })).toEqual({
// 			coursesList: [],
// 			filterField: '',
// 			isLoading: false,
// 			error: null,
// 		});
// 	});

// 	it('should add new course to the list', () => {
// 		const previousState: CourseState = {
// 			coursesList: [],
// 			filterField: '',
// 			isLoading: false,
// 			error: null,
// 		};
// 		const newCourse: Course = {
// 			id: '2',
// 			title: 'title 2',
// 			description: 'description 2',
// 			creationDate: '3/4/2008',
// 			duration: 24,
// 			authors: ['id2'],
// 		};
// 		const newAction = createAction(
// 			COURSES_ACTION_TYPES.ADD_NEW_COURSE_TO_LIST,
// 			newCourse
// 		);
// 		const expectedState: CourseState = {
// 			coursesList: [
// 				{
// 					id: '2',
// 					title: 'title 2',
// 					description: 'description 2',
// 					creationDate: '3/4/5678',
// 					duration: 24,
// 					authors: ['id2'],
// 				},
// 			],
// 			filterField: '',
// 			isLoading: false,
// 			error: null,
// 		};
// 		expect(coursesReducer(previousState, newAction)).toEqual(expectedState);
// 	});

// 	it('should handle GET_COURSES and returns new state', async () => {
// 		// store without courses
// 		const store = mockStore({ ...mockedState, courses: { coursesList: [] } });
// 		const expectedCoursesList = mockedState.courses.coursesList;
// 		expect(store.getState().courses.coursesList.length).toEqual(0);
// 		expect(expectedCoursesList.length).toEqual(2);

// 		fetchMock.mockResponseOnce(
// 			JSON.stringify({
// 				successful: true,
// 				result: expectedCoursesList,
// 			})
// 		);
// 		const data = await getAllCoursesFromAPI();
// 		expect(data.successful).toEqual(true);
// 		store.dispatch(fetchCoursesSuccess(data.result));

// 		expect(store.getState().courses.coursesList.length).toEqual(2);
// 	});
// });
