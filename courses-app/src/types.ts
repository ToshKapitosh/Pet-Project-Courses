export interface CourseType {
	id?: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface CoursesState {
	courses: CourseType[];
	status: boolean;
	error: string | null;
}

export type AuthorType = {
	id: string;
	name: string;
};

export type AuthorRequestType = {
	name: string;
};

export interface AuthorsState {
	authors: AuthorType[];
	status: boolean;
	error: string | null;
}

export type CoursesResponseType = {
	successful: boolean;
	result: CourseType[];
};

export type AuthorsResponseType = {
	successful: boolean;
	result: AuthorType[];
};

export type InputProps = {
	placeholder?: string;
	value?: string | number;
	name?: string;
	label?: string;
	type?: string;
	htmlFor?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	text: string | JSX.Element;
	onClick?: () => void;
};

export type SearchBarProps = {
	onSearch: (results: CourseType[]) => void;
};

export type CourseCardType = {
	course: CourseType;
};

export type CreateCourseProps = {
	authors: AuthorType[];
	onAdd: (course: CourseType, authors: AuthorType[]) => void;
};

export interface LoginValues {
	name?: string;
	email: string;
	password: string;
}

export type TokenResponse = {
	successful: boolean;
	result: string;
	user: { name: string; email: string };
};

export type UserDetailResponse = {
	result: {
		email: string;
		id: string;
		name: string;
		password: string;
		role: string;
	};
	successful: boolean;
};

export interface LoginValues {
	name?: string;
	email: string;
	password: string;
}

export type UserRegResponse = { successful: boolean; result: string };

export interface UserState {
	isAuth: boolean;
	token: string;
	name: string;
	email: string;
	isAdmin: boolean;
	status: boolean;
	error: string | null;
}

export type ChangeCourseResponse = {
	successful: boolean;
	result: CourseType;
};

export type ChangingCourseDataType = {
	course: CourseType;
	token: string;
};

export type UpdatingCourseDataType = {
	course: CourseType;
	id: string;
	token: string;
};

export type DeletingDataType = {
	id: string;
	token: string;
};

export type ChangingAuthorDataType = {
	authorData: AuthorRequestType;
	token: string;
};

export type ChangeAuthorResponse = {
	successful: boolean;
	result: AuthorType;
};

export type DeleteResponse = {
	successful: boolean;
	result: string;
};

export type PrivateRouteProps = {
	role: boolean | undefined;
	redirectTo?: string;
	component: JSX.Element;
};
