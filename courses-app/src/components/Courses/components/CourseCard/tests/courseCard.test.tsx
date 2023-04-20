import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CourseCard from '../CourseCard';
import { mockedAuthorsList, mockedState1 } from '../../../../../constants';

const mockedStore = {
	getState: () => mockedState1,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
	replaceReducer: jest.fn(),
	[Symbol.observable]: jest.fn(),
};

const course = {
	id: '1',
	title: 'courseCardTitle1',
	description: 'courseCardDescription1',
	creationDate: '3/4/2015',
	duration: 240,
	authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
};

jest.mock('../../../../../hooks/useCoursesHook', () => {
	return () => ({
		courses: [
			{
				id: '3',
				title: 'title',
				description: 'descriptionTest1',
				creationDate: '3/4/2023',
				duration: 120,
				authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
			},
			{
				id: '4',
				title: 'title2',
				description: 'descriptionTest2',
				creationDate: '3/4/2023',
				duration: 90,
				authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
			},
		],
	});
});

jest.mock('../../../../../hooks/useAuthorsHook', () => {
	return () => ({
		authors: mockedAuthorsList,
	});
});

describe('Course card tests', () => {
	it('CourseCard should display title', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);

		const courseTitle = await screen.findByText(/courseCardTitle1/i);
		expect(courseTitle).toBeInTheDocument();
	});

	it('CourseCard should display description', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);

		const description = await screen.findByText(/courseCardDescription1/i);
		expect(description).toBeInTheDocument();
	});

	it('CourseCard should display duration in the correct format', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);

		const correctTime = await screen.findByText('04:00 hours');
		expect(correctTime).toBeInTheDocument();
	});

	it('CourseCard should display authors list', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);
		screen.debug();
		const authorName = await screen.findByText(/Vasiliy Dobkin/i);
		expect(authorName).toBeInTheDocument();
	});

	it('CourseCard should display created date in the correct format', async () => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);

		const correctDate = await screen.findByText('3/4/2015');
		expect(correctDate).toBeInTheDocument();
	});
});
