import { ErrorPage } from '../Layout/ErrorPage';
import { JournalDay, journalDayLoader } from './JournalDay';
import { JournalDayEditor, journalDayEditorLoader } from './JournalDayEditor';
import { JournalQuestions, journalQuestionsLoader } from './JournalQuestions';
import { JournalRoot } from './JournalRoot';
import { JournalStats, journalStatsLoader } from './JournalStats';
import { JournalSummary, journalSummaryLoader } from './JournalSummary';
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
            loader: journalSummaryLoader,
            element: <JournalSummary />,
          },
          {
            path: 'stats',
            loader: journalStatsLoader,
            element: <JournalStats />,
          },
          {
            path: 'questions',
            loader: journalQuestionsLoader,
            element: <JournalQuestions />,
          },
          {
            path: ':date',
            loader: journalDayLoader,
            element: <JournalDay />,
          },
          {
            path: ':date/edit',
            loader: journalDayEditorLoader,
            element: <JournalDayEditor />,
          },
        ],
      },
    ],
  },
];
