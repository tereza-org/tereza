import { Auth, useAuth } from '@ttoss/react-auth';
import { ErrorPage } from './modules/Layout/ErrorPage';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import { Root } from './modules/Layout/Root';
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

const router = createBrowserRouter([
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
    children: [...zettelRoutes],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
