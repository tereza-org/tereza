import { Auth, useAuth } from '@ttoss/react-auth';
import { ComingSoon } from './modules/Layout/ComingSoon';
import { ErrorPage } from './modules/Layout/ErrorPage';
import {
  HasUserAccessToApp,
  hasUserAccessToAppLoader,
} from './modules/Account/HasUserAccessToApp';
import { Navigate, RouteObject, useLocation } from 'react-router-dom';
import { Root } from './modules/Layout/Root';
import { journalRoutes } from './modules/Journal/journalRoutes';
import { zettelRoutes } from './modules/Zettel/zettelRoutes';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const RedirectIfAuthenticated = ({
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

export const routes: RouteObject[] = [
  {
    path: 'auth',
    element: (
      <RedirectIfAuthenticated>
        <Auth />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: hasUserAccessToAppLoader,
        element: <HasUserAccessToApp />,
        children: [
          ...zettelRoutes,
          ...journalRoutes,
          {
            path: '/crm',
            element: <ComingSoon />,
          },
          {
            path: '/gym',
            element: <ComingSoon />,
          },
        ],
      },
    ],
  },
];
