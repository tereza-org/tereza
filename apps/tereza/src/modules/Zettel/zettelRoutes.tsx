import { RouteObject } from 'react-router-dom';
import { ZettelForm, zettelFormAction } from './ZettelForm';
import { ZettelHome, zettelHomeLoader } from './ZettelHome';
import { ZettelRoot } from './ZettelRoot';

export const zettelRoutes: RouteObject[] = [
  {
    path: 'zettel',
    element: <ZettelRoot />,
    children: [
      {
        path: '',
        loader: zettelHomeLoader,
        element: <ZettelHome />,
      },
      {
        path: 'edit',
        action: zettelFormAction,
        element: <ZettelForm />,
      },
    ],
  },
];
