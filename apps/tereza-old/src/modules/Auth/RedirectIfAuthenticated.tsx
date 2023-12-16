import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@ttoss/react-auth';

export const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();

  const location = useLocation();

  const to = location.state.from.pathname || '/';

  if (auth.isAuthenticated) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
