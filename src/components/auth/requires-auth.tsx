import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from './auth-context';

export interface RequiresAuthProps {
  redirectTo: string;
}

export const RequiresAuth = ({ redirectTo }: RequiresAuthProps) => {
  const { username, password } = useAuthContext();

  if (username && password) {
    return <Outlet />;
  }

  return <Navigate to={redirectTo} />;
};
