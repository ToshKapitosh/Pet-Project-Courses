import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
	AuthorsState,
	AuthorType,
	ChangingAuthorDataType,
	DeletingDataType,
} from '../../types';
import { AuthorsAPI } from '../../helpers/api';

export const getAuthorsRequest = createAsyncThunk<AuthorType[]>(
	'authors/get',
	async () => {
		try {
			const { result } = await AuthorsAPI.getAuthors();

			return result;
		} catch (error: any) {
			return error.message;
		}
	}
);
export const addAuthorRequest = createAsyncThunk<
	AuthorType,
	ChangingAuthorDataType
>('authors/add', async ({ authorData, token }) => {
	try {
		const { result } = await AuthorsAPI.addAuthor(authorData, token);
		return result;
	} catch (error: any) {
		return error.message;
	}
});
export const deleteAuthorRequest = createAsyncThunk<string, DeletingDataType>(
	'authors/delete',
	async ({ id, token }) => {
		try {
			const { successful } = await AuthorsAPI.deleteAuthor(id, token);
			if (successful) {
				return id;
			}
		} catch (error: any) {
			return error.message;
		}
	}
);

const initialState: AuthorsState = {
	authors: [],
	status: false,
	error: null,
};

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getAuthorsRequest.pending, pendingHandler)
			.addCase(
				getAuthorsRequest.fulfilled,
				(state: AuthorsState, { payload }: PayloadAction<AuthorType[]>) => {
					state.authors = [...payload];
					state.status = false;
				}
			)
			.addCase(getAuthorsRequest.rejected, rejectHandler)

			.addCase(addAuthorRequest.pending, pendingHandler)
			.addCase(
				addAuthorRequest.fulfilled,
				(state: AuthorsState, { payload }: PayloadAction<AuthorType>) => {
					state.authors = [payload, ...state.authors];
					state.status = false;
				}
			)
			.addCase(addAuthorRequest.rejected, rejectHandler)

			.addCase(deleteAuthorRequest.pending, pendingHandler)
			.addCase(
				deleteAuthorRequest.fulfilled,
				(state: AuthorsState, { payload }: PayloadAction<string>) => {
					state.authors = state.authors.filter(
						(author) => author.id !== payload
					);
					state.status = false;
				}
			)
			.addCase(deleteAuthorRequest.rejected, rejectHandler),
});

function pendingHandler(state: AuthorsState) {
	state.error = null;
	state.status = true;
}
function rejectHandler(state: AuthorsState, { payload }: PayloadAction<any>) {
	state.error = payload;
	state.status = false;
}

export const authorsReducer = authorsSlice.reducer;
