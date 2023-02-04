import { ErrorPage } from '../Layout/ErrorPage';
import { RouteObject } from 'react-router-dom';
import { ZettelForm, zettelFormLoader } from './ZettelForm';
import { ZettelHome, zettelHomeLoader } from './ZettelHome';
import { ZettelNote } from './ZettelNote';
import { ZettelRoot } from './ZettelRoot';

export const zettelRoutes: RouteObject[] = [
  {
    path: 'zettel',
    element: <ZettelRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: zettelHomeLoader,
        element: <ZettelHome />,
      },
      {
        path: 'editor',
        loader: zettelFormLoader,
        element: <ZettelForm />,
      },
      {
        path: 'note',
        element: <ZettelNote />,
      },
    ],
  },
];
