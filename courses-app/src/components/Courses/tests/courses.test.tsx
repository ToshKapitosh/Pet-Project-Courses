import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';

import Courses from '../../Courses';
import {
	BUTTONS_TEXT,
	mockCourses,
	mockedState1,
	mockedState2,
} from '../../../constants';
import useCoursesHook from '../../../hooks/useCoursesHook';

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

const navigate = jest.fn();

describe('Courses tests', () => {
	beforeEach(() => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			courses: mockCourses,
			coursesLoading: false,
			coursesError: null,
		});
		jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
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
		render(
			<Provider store={mockedStore2}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() =>
			expect(
				screen.getByText(/Sorry, i can't find anything/i)
			).toBeInTheDocument()
		);
	});

	it('CourseForm should be showed after a click on a button "Add new course"', async () => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			courses: mockCourses,
			coursesLoading: false,
			coursesError: null,
		});
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		await screen.findByText('title');
		const addButton = await screen.findByText(BUTTONS_TEXT.ADD);
		userEvent.click(addButton);

		expect(navigate).toHaveBeenCalledWith('/courses/add');
	});
});
