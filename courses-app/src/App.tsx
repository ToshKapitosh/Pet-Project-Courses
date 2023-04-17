import { useEffect } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';

import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import NotFound from './components/NotFound';
import CourseInfo from './components/CourseInfo';
import CourseForm from './components/CourseForm';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { StyledWrapper } from './App.style';

import useUserHook from './hooks/useUserHook';

function App() {
	const { token, isAdmin } = useUserHook();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		!token &&
			location.pathname !== '/login' &&
			location.pathname !== '/registration' &&
			navigate('/login');

		token &&
			(location.pathname === '/login' ||
				location.pathname === '/registration') &&
			navigate('/courses');
	}, [token, location, navigate]);

	return (
		<StyledWrapper>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate to='/courses' />} />
				<Route path='/courses' element={<Courses />} />
				<Route
					path='/courses/add'
					element={
						<PrivateRoute
							role={isAdmin}
							redirectTo='/courses'
							component={<CourseForm />}
						/>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute
							role={isAdmin}
							redirectTo='/courses'
							component={<CourseForm />}
						/>
					}
				/>
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/not-found' element={<NotFound />} />
				<Route path='*' element={<Navigate to='/not-found' replace />} />
			</Routes>
		</StyledWrapper>
	);
}

export default App;
