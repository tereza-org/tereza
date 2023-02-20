import * as React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { useTheme } from '@ttoss/ui';
import './amplify';
import '@tereza-tech/components/dist/index.css';

export const App = () => {
  const { setColorMode } = useTheme();

  React.useEffect(() => {
    setColorMode?.('dark');
  }, []);

  return <RouterProvider router={createBrowserRouter(routes)} />;
};
