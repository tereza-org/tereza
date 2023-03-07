import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@ttoss/react-auth';

export const RequireAuthentication = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
