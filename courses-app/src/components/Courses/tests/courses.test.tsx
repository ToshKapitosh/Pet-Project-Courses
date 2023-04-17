import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Courses from '../../Courses';
import { mockedState1, mockedState2, BUTTONS_TEXT } from '../../../constants';

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

test('Courses should display amount of CourseCard equal length of courses array', (): void => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.queryAllByRole('article')).toHaveLength(2);
});

test('Courses should display Empty container if courses array length is 0', (): void => {
	render(
		<Provider store={mockedStore2}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);

	expect(screen.getByTestId('courses-container')).toBeEmptyDOMElement();
});

test('CourseForm should be showed after a click on a button "Add new course"', async (): Promise<void> => {
	render(
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);

	fireEvent.click(screen.getByText(BUTTONS_TEXT.ADD));

	expect(window.location.pathname).toBe('/courses/add');
});
