import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
	LoginValues,
	TokenResponse,
	UserDetailResponse,
	UserRegResponse,
	UserState,
} from '../../types';
import { UserAPI } from '../../helpers/api';

export const loginRequest = createAsyncThunk<TokenResponse, LoginValues>(
	'user/login',
	async (formData) => {
		const response = await UserAPI.login(formData);
		return response;
	}
);

export const registerRequest = createAsyncThunk<UserRegResponse, LoginValues>(
	'user/register',
	async (formData) => {
		const response = await UserAPI.register(formData);
		return response;
	}
);
export const logOutRequest = createAsyncThunk<string, string>(
	'user/logOut',
	async (token: string) => {
		const response = await UserAPI.logout(token);
		return response.statusText;
	}
);
export const getCurrentUserRequest = createAsyncThunk<
	UserDetailResponse,
	string
>('user/getCurrent', async (token: string) => {
	try {
		const response = await UserAPI.getUserDetails(token);

		return response;
	} catch (error: any) {
		return error.message;
	}
});

const initialState: UserState = {
	name: '',
	email: '',
	token: '',
	isAdmin: false,
	isAuth: false,
	status: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(loginRequest.pending, pendingHandler)
			.addCase(
				loginRequest.fulfilled,
				(state: UserState, { payload }: PayloadAction<TokenResponse>) => {
					state.status = false;
					state.isAuth = payload.successful;
					state.token = payload.result;
					state.name = payload.user.name ? payload.user.name : 'Admin';
					state.email = payload.user.email;
					localStorage.setItem('token', payload.result);
					localStorage.setItem('userName', payload.user.name);
					localStorage.setItem('email', payload.user.email);
				}
			)
			.addCase(loginRequest.rejected, rejectHandler)

			.addCase(registerRequest.pending, pendingHandler)
			.addCase(
				registerRequest.fulfilled,
				(state: UserState, action: PayloadAction<any>) => {
					state.status = false;
				}
			)
			.addCase(registerRequest.rejected, rejectHandler)

			.addCase(getCurrentUserRequest.pending, pendingHandler)
			.addCase(
				getCurrentUserRequest.fulfilled,
				(state: UserState, { payload }: PayloadAction<UserDetailResponse>) => {
					const localToken = localStorage.getItem('token');
					state.status = false;
					state.isAuth = payload.successful;
					state.token = localToken ? localToken : state.token;
					state.email = payload.result.email;
					state.name = payload.result.name ? payload.result.name : 'Admin';
					state.isAdmin = payload.result.role === 'admin' ? true : false;
				}
			)
			.addCase(getCurrentUserRequest.rejected, rejectHandler)

			.addCase(logOutRequest.pending, pendingHandler)
			.addCase(logOutRequest.fulfilled, (state: UserState) => {
				state.status = false;
				state.isAuth = false;
				state.token = '';
				state.name = '';
				state.email = '';
				state.isAdmin = false;
				localStorage.removeItem('token');
				localStorage.removeItem('userName');
				localStorage.removeItem('email');
			})
			.addCase(logOutRequest.rejected, rejectHandler),
});

function pendingHandler(state: UserState) {
	state.error = null;
	state.status = true;
}
function rejectHandler(state: UserState, action: any) {
	state.error = action.error.message;
	state.status = false;
}

export const userReducer = userSlice.reducer;
