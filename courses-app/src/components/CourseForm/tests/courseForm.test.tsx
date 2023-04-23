import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import useAuthorsHook from '../../../hooks/useAuthorsHook';
import useCoursesHook from '../../../hooks/useCoursesHook';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import CourseForm from '../../CourseForm';
import {
	mockedState1,
	BUTTONS_TEXT,
	mockedAuthorsList,
	mockCourses,
	INPUTS_TEXT,
} from '../../../constants';

const mockedStore = {
	getState: () => mockedState1,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

jest.mock('../../../hooks/useCoursesHook');
jest.mock('../../../hooks/useAuthorsHook');
jest.mock('../../../hooks/reduxHooks');

describe('Course form tests', () => {
	beforeEach(() => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			courses: mockCourses,
			coursesLoading: false,
			coursesError: null,
		});
		(useAppDispatch as jest.Mock).mockReturnValue(mockedStore.dispatch());
		(useAuthorsHook as jest.Mock).mockReturnValue({
			authors: mockedAuthorsList,
			authorsStatus: false,
			authorsError: null,
		});
	});

	it('CourseForm should show all authors lists', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		const allAuthorsContainer = await screen.findByTestId('all-authors');
		const allAuthors = await screen.findAllByTestId('all-authors-author');

		expect(allAuthorsContainer).not.toBeEmptyDOMElement();
		expect(allAuthors.length).toBe(4);

		expect(screen.getByText('Author list is empty')).toBeInTheDocument();
		expect(
			screen.queryByTestId('course-authors-author')
		).not.toBeInTheDocument();
	});

	it("CourseForm 'Create author' click button should call dispatch", async (): Promise<void> => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		const input = screen.getByPlaceholderText(INPUTS_TEXT.AUTHOR_PLH);

		fireEvent.change(input, { target: { value: 'Ebeneizer Scrudge' } });
		userEvent.click(screen.getByText(BUTTONS_TEXT.CREATE_AUTHOR));

		await waitFor(() => expect(mockedStore.dispatch).toHaveBeenCalled());
	});

	it("CourseForm 'Add author' button click should add an author to course authors list", () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Author list is empty')).toBeInTheDocument();
		expect(
			screen.queryByTestId('course-authors-author')
		).not.toBeInTheDocument();

		userEvent.click(
			screen.getAllByRole('button', { name: BUTTONS_TEXT.ADD_AUTHOR })[0]
		);

		expect(screen.getAllByTestId('course-authors-author').length).toBe(1);
		expect(screen.queryByText('Author list is empty')).not.toBeInTheDocument();
	});

	it("CourseForm 'Delete author' button click should delete an author from the course list", () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		userEvent.click(
			screen.getAllByRole('button', { name: BUTTONS_TEXT.ADD_AUTHOR })[0]
		);

		expect(screen.getAllByTestId('course-authors-author').length).toBe(1);

		userEvent.click(
			screen.getAllByRole('button', { name: BUTTONS_TEXT.DEL_AUTHOR })[0]
		);

		expect(screen.queryByText('Author list is empty')).toBeInTheDocument();
		expect(
			screen.queryByTestId('course-authors-author')
		).not.toBeInTheDocument();
	});
});
