import { ErrorPage } from '../Layout/ErrorPage';
import { RouteObject } from 'react-router-dom';
import { ZettelHome, zettelHomeLoader } from './ZettelHome';
import { ZettelNote, zettelNoteLoader } from './ZettelNote';
import { ZettelNoteEditor, zettelNoteEditorLoader } from './ZettelNoteEditor';
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
        path: 'note/:noteId',
        loader: zettelNoteLoader,
        element: <ZettelNote />,
      },
      {
        path: 'editor',
        loader: zettelNoteEditorLoader,
        element: <ZettelNoteEditor />,
      },
      {
        path: 'editor/:noteId',
        loader: zettelNoteEditorLoader,
        element: <ZettelNoteEditor />,
      },
    ],
  },
];
