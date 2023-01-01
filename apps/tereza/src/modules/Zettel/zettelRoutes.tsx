import { RouteObject } from 'react-router-dom';
import { ZettelForm, zettelFormAction } from './ZettelForm';
import { ZettelRoot } from './ZettelRoot';

export const zettelRoutes: RouteObject[] = [
  {
    path: 'zettel',
    element: <ZettelRoot />,
    children: [
      {
        path: 'edit',
        action: zettelFormAction,
        element: <ZettelForm />,
      },
    ],
  },
];
