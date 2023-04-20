import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Courses from '../../Courses';
import {
	BUTTONS_TEXT,
	mockCourses,
	mockedState1,
	mockedState2,
} from '../../../constants';
import useCoursesHook from '../../../hooks/useCoursesHook';
import userEvent from '@testing-library/user-event';

const mockedStore = {
	getState: () => mockedState1,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

const mockedStore2 = {
	getState: () => mockedState2,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

jest.mock('../../../hooks/useCoursesHook');

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn(),
}));

describe('Courses tests', () => {
	beforeEach(() => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			courses: mockCourses,
			coursesLoading: false,
			coursesError: null,
		});
	});

	it('Courses should display amount of CourseCard equal length of courses array', () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByText('descriptionTest1')).toBeInTheDocument();
	});

	it('Courses should display error message if courses array length is 0', async () => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			coursesError: null,
			courses: [],
			coursesLoading: false,
		});
		// const mockStore = configureStore();
		// const coursesStore = mockStore(mockedState2);
		// coursesStore.clearActions();
		render(
			<Provider store={mockedStore2}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => expect(screen.getByText(/Sorry/i)).toBeInTheDocument());
	});

	// it('CourseForm should be showed after a click on a button "Add new course"', async () => {
	// 	(useCoursesHook as jest.Mock).mockReturnValue({
	// 		courses: mockCourses,
	// 		coursesLoading: false,
	// 		coursesError: null,
	// 	});
	// 	// const mockStore = configureStore();
	// 	// const coursesStore = mockStore(mockedState1);
	// 	// coursesStore.clearActions();
	// 	render(
	// 		<Provider store={mockedStore}>
	// 			<BrowserRouter>
	// 				<Courses />
	// 			</BrowserRouter>
	// 		</Provider>
	// 	);

	// 	await screen.findByText('title');
	// 	const addButton = await screen.findByText(BUTTONS_TEXT.ADD);
	// 	userEvent.click(addButton);

	// 	expect(useNavigate).toHaveBeenCalledWith('/courses/add');
	// 	// await waitFor(() => expect(window.location.pathname).toBe('/courses/add'));
	// });
});
