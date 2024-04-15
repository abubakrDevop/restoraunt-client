import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.js';

const RequireAuth = ({children}) => {
  const {isAuth, isLoading} = useAuth();
  const token = localStorage.getItem('token');
  if (isLoading) {
    return;
  }

  if (!token || !isAuth) {
    return <Navigate to={'/login'} replace/>;
  }

  return children;
};

export default RequireAuth;