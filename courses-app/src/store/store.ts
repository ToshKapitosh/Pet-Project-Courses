import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authorsReducer } from './authors/authorsSlice';
import { userReducer } from './user/userSlice';
import { coursesReducer } from './courses/coursesSlice';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
