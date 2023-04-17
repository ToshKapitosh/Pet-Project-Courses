import { RootState } from './store';

export const selectUserName = ({ user }: RootState) => user.name;
export const selectIsAuth = ({ user }: RootState) => user.isAuth;
export const selectToken = ({ user }: RootState) => user.token;

export const selectUserState = ({ user }: RootState) => user;
export const selectCoursesState = ({ courses }: RootState) => courses;
export const selectAuthorsState = ({ authors }: RootState) => authors;

export const selectCourses = ({ courses }: RootState) => courses.courses;

export const selectAuthors = ({ authors }: RootState) => authors.authors;
