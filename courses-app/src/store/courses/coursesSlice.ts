import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeCourseResponse,
	ChangingCourseDataType,
	UpdatingCourseDataType,
	CoursesState,
	CourseType,
	DeletingDataType,
} from '../../types';
import { CoursesAPI } from '../../helpers/api';

export const getCoursesRequest = createAsyncThunk<CourseType[]>(
	'courses/get',
	async () => {
		try {
			const { result } = await CoursesAPI.getCourses();

			return result;
		} catch (error: any) {
			return error.message;
		}
	}
);
export const addCourseRequest = createAsyncThunk<
	ChangeCourseResponse,
	ChangingCourseDataType
>('courses/add', async ({ course, token }) => {
	const response = await CoursesAPI.addCourse(course, token);
	return response as ChangeCourseResponse;
});
export const getCourseRequest = createAsyncThunk<string, any>(
	'courses/getCourse',
	async (courseId) => {
		const { data } = await CoursesAPI.getCourse(courseId);
		return data;
	}
);
export const deleteCourseRequest = createAsyncThunk<string, DeletingDataType>(
	'courses/delete',
	async ({ id, token }) => {
		try {
			const { successful } = await CoursesAPI.deleteCourse(id, token);
			if (successful) {
				return id;
			}
		} catch (error: any) {
			return error.message;
		}
	}
);
export const updateCourseRequest = createAsyncThunk<
	ChangeCourseResponse,
	UpdatingCourseDataType
>('courses/update', async ({ course, id, token }) => {
	const response = await CoursesAPI.updateCourse(course, id, token);
	return response;
});

const initialState: CoursesState = {
	courses: [],
	status: false,
	error: null,
};

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getCoursesRequest.pending, pendingHandler)
			.addCase(
				getCoursesRequest.fulfilled,
				(state: CoursesState, { payload }: PayloadAction<CourseType[]>) => {
					state.courses = [...payload];
					state.status = false;
				}
			)
			.addCase(getCoursesRequest.rejected, rejectHandler)

			.addCase(addCourseRequest.pending, pendingHandler)
			.addCase(
				addCourseRequest.fulfilled,
				(
					state: CoursesState,
					{ payload }: PayloadAction<ChangeCourseResponse>
				) => {
					state.courses = [payload.result, ...state.courses];
					state.status = false;
				}
			)
			.addCase(addCourseRequest.rejected, rejectHandler)

			.addCase(deleteCourseRequest.pending, pendingHandler)
			.addCase(
				deleteCourseRequest.fulfilled,
				(state: CoursesState, { payload }: PayloadAction<string>) => {
					state.courses = state.courses.filter(
						(course) => course.id !== payload
					);
					state.status = false;
				}
			)
			.addCase(deleteCourseRequest.rejected, rejectHandler)

			.addCase(updateCourseRequest.pending, pendingHandler)
			.addCase(
				updateCourseRequest.fulfilled,
				(
					state: CoursesState,
					{ payload }: PayloadAction<ChangeCourseResponse>
				) => {
					state.courses = state.courses.map((course) =>
						course.id === payload.result.id ? payload.result : course
					);
					state.status = false;
				}
			)
			.addCase(updateCourseRequest.rejected, rejectHandler),
});

function pendingHandler(state: CoursesState) {
	state.error = null;
	state.status = true;
}
function rejectHandler(state: CoursesState, { payload }: PayloadAction<any>) {
	state.error = payload;
	state.status = false;
}

export const coursesReducer = coursesSlice.reducer;
