import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import './amplify';
import '@tereza-tech/components/dist/index.css';

export const App = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
