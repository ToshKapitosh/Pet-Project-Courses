export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812bebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const USER_NAME = 'Test user';

export const BUTTONS_TEXT = {
	ADD: 'Add new course',
	OUT: 'Logout',
	IN: 'Login',
	REG: 'Registration',
	SRCH: 'Search',
	SHOW: 'Show course',
	SHOWALL: 'Show course list',
	CREATE_COURSE: 'Create course',
	UPDATE_COURSE: 'Update course',
	CREATE_AUTHOR: 'Create author',
	ADD_AUTHOR: 'Add author',
	DEL_AUTHOR: 'Delete author',
	RETURN: 'Back to our site',
};

export const INPUTS_TEXT = {
	SRCH: 'Enter course name...',
	TITLE: 'Title',
	TITLE_PLH: 'Enter title',
	DESCR: 'Description',
	DESCR_PLH: 'Enter description',
	AUTHOR: 'Author name',
	AUTHOR_FOR: 'AuthorName',
	AUTHOR_PLH: 'Enter author name...',
	DURATION: 'Duration',
	DURATION_PLH: 'Enter duration in minutes...',
	NAME: 'Name',
	NAME_PLH: 'Enter name',
	EML: 'Email',
	EML_PLH: 'Enter email',
	PASS: 'Password',
	PASS_PLH: 'Enter password',
};

export const mockedState1 = {
	user: {
		isAuth: true,
		name: 'Test User',
	},
	courses: [
		{
			id: '1',
			title: 'title',
			description: 'description',
			creationDate: '3/4/2023',
			duration: 120,
			authors: ['author', 'author2'],
		},
		{
			id: '2',
			title: 'title2',
			description: 'description2',
			creationDate: '3/4/2023',
			duration: 90,
			authors: ['author1', 'author3'],
		},
	],
	authors: [{ id: 'id1' }, { id: 'id2' }],
};

export const mockedState2 = {
	user: {
		isAuth: true,
		name: 'Test User',
	},
	courses: [],
};
