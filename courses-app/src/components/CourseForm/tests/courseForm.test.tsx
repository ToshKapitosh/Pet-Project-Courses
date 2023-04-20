import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import useAuthorsHook from '../../../hooks/useAuthorsHook';
import useCoursesHook from '../../../hooks/useCoursesHook';
import CourseForm from '../../CourseForm';
import {
	mockedState1,
	BUTTONS_TEXT,
	mockedAuthorsList,
	mockCourses,
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

describe('Course form tests', () => {
	beforeEach(() => {
		(useCoursesHook as jest.Mock).mockReturnValue({
			courses: mockCourses,
			coursesLoading: false,
			coursesError: null,
		});
		(useAuthorsHook as jest.Mock).mockReturnValue({
			authors: mockedAuthorsList,
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
		const allAuthors = await screen.findAllByTestId('all-authors-authors');

		expect(allAuthorsContainer).not.toBeEmptyDOMElement();
		expect(allAuthors.length).toBe(4);

		expect(screen.queryByTestId('course-authors')).toBeEmptyDOMElement();
	});

	it("CourseForm 'Create author' click button should call dispatch", async (): Promise<void> => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);

		userEvent.click(screen.getByText(BUTTONS_TEXT.CREATE_AUTHOR));

		await waitFor(() => expect(mockedStore.dispatch).toHaveBeenCalledTimes(2));
	});

	// it("CourseForm 'Add author' button click should add an author to course authors list", async () => {
	// 	render(
	// 		<Provider store={mockedStore}>
	// 			<BrowserRouter>
	// 				<CourseForm />
	// 			</BrowserRouter>
	// 		</Provider>
	// 	);

	// 	expect(screen.queryByTestId('course-authors')).toBeEmptyDOMElement();

	// 	fireEvent.click(
	// 		screen.getAllByRole('button', { name: BUTTONS_TEXT.ADD_AUTHOR })[0]
	// 	);

	// 	await waitFor(() =>
	// 		expect(screen.getAllByTestId('course-authors-authors').length).toBe(1)
	// 	);
	// });

	// it("CourseForm 'Delete author' button click should delete an author from the course list", async () => {
	// 	render(
	// 		<Provider store={mockedStore}>
	// 			<BrowserRouter>
	// 				<CourseForm />
	// 			</BrowserRouter>
	// 		</Provider>
	// 	);

	// 	fireEvent.click(
	// 		screen.getAllByRole('button', { name: BUTTONS_TEXT.ADD_AUTHOR })[0]
	// 	);

	// 	await waitFor(() =>
	// 		expect(screen.getAllByTestId('course-authors-item').length).toBe(1)
	// 	);

	// 	fireEvent.click(
	// 		screen.getAllByRole('button', { name: BUTTONS_TEXT.DEL_AUTHOR })[0]
	// 	);

	// 	await waitFor(() =>
	// 		expect(screen.queryByTestId('course-authors')).toBeEmptyDOMElement()
	// 	);
	// });
});
