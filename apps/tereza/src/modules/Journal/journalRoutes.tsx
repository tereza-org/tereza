import { ErrorPage } from '../Layout/ErrorPage';
import { JournalDay, journalDayLoader } from './JournalDay';
import { JournalRoot } from './JournalRoot';
import { JournalSummary } from './JournalSummary';
import { RouteObject } from 'react-router-dom';

export const journalRoutes: RouteObject[] = [
  {
    path: 'journal',
    element: <JournalRoot />,
    children: [
      {
        path: '',
        errorElement: <ErrorPage />,
        children: [
          {
            path: '',
            // loader: zettelHomeLoader,
            element: <JournalSummary />,
          },
          {
            path: ':date',
            loader: journalDayLoader,
            element: <JournalDay />,
          },
        ],
      },
    ],
  },
];
