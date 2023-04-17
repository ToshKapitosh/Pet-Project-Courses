import axios from 'axios';
import {
	ChangeCourseResponse,
	AuthorsResponseType,
	ChangeAuthorResponse,
	CourseType,
	CoursesResponseType,
	LoginValues,
	TokenResponse,
	UserDetailResponse,
	DeleteResponse,
	UserRegResponse,
} from '../types';

axios.defaults.baseURL = 'http://localhost:4000';

export const UserAPI = {
	async register(formData: LoginValues) {
		const { data } = await axios.post<UserRegResponse>(`/register`, formData);
		return data;
	},
	async login(formData: LoginValues) {
		const { data } = await axios.post<TokenResponse>(`/login`, formData);
		return data;
	},
	async getUserDetails(token: string) {
		const { data } = await axios.get<UserDetailResponse>(`/users/me`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async logout(token: string) {
		const result = await axios.delete(`/logout`, {
			headers: { Authorization: `${token}` },
		});
		return result;
	},
};

export const CoursesAPI = {
	async getCourses() {
		const { data } = await axios.get<CoursesResponseType>(`/courses/all`);
		return data;
	},
	async addCourse(courseData: CourseType, token: string) {
		const { data } = await axios.post<ChangeCourseResponse>(
			`/courses/add`,
			courseData,
			{
				headers: { Authorization: `${token}` },
			}
		);
		return data;
	},
	async getCourse(courseId: string) {
		const { data } = await axios.get(`/courses/${courseId}`);
		return data;
	},
	async deleteCourse(courseId: string, token: string) {
		const { data } = await axios.delete(`/courses/${courseId}`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async updateCourse(courseData: CourseType, id: string, token: string) {
		const { data } = await axios.put<ChangeCourseResponse>(
			`/courses/${id}`,
			courseData,
			{
				headers: { Authorization: `${token}` },
			}
		);
		return data;
	},
};

export const AuthorsAPI = {
	async getAuthors() {
		const { data } = await axios.get<AuthorsResponseType>(`/authors/all`);
		return data;
	},
	async addAuthor(authorData: { name: string }, token: string) {
		const { data } = await axios.post<ChangeAuthorResponse>(
			`/authors/add`,
			authorData,
			{
				headers: { Authorization: `${token}` },
			}
		);
		return data;
	},
	async getAuthor(authorId: string, token: string) {
		const { data } = await axios.get(`/authors/${authorId}`, {
			headers: { Authorization: `${token}` },
		});
		return data;
	},
	async deleteAuthor(authorId: string, token: string) {
		const { data } = await axios.delete<DeleteResponse>(
			`/authors/${authorId}`,
			{
				headers: { Authorization: `${token}` },
			}
		);
		return data;
	},
};
