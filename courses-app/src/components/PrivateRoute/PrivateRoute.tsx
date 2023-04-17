import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from '../../types';

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	role,
	redirectTo = '/courses',
	component: Component,
}) => {
	return role ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
