import { AppRoot, ErrorPage } from './modules/Layout';
import {
  Auth,
  RedirectIfAuthenticated,
  RequireAuthentication,
} from './modules/Auth';
import {
  JournalAll,
  JournalDay,
  JournalDayEditor,
  JournalQuestions,
  JournalRoot,
  JournalStats,
  JournalSummary,
  journalAllLoader,
  journalDayEditorLoader,
  journalDayLoader,
  journalQuestionsLoader,
  journalStatsLoader,
  journalSummaryLoader,
} from './modules/Journal';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  ZettelGraph,
  ZettelHome,
  ZettelNote,
  ZettelNoteEditor,
  ZettelRoot,
  ZettelTags,
  zettelGraphLoader,
  zettelHomeLoader,
  zettelNoteEditorLoader,
  zettelNoteLoader,
  zettelTagsLoader,
} from './modules/Zettel';
import './amplify';
import '@tereza-tech/components/dist/index.css';

const routes = (
  <>
    <Route
      path="/auth"
      element={
        <RedirectIfAuthenticated>
          <Auth />
        </RedirectIfAuthenticated>
      }
    />
    <Route
      path="/"
      element={
        <RequireAuthentication>
          <AppRoot />
        </RequireAuthentication>
      }
      errorElement={<ErrorPage />}
    >
      <Route path="/" element={<Navigate to="/zettel" />} />
      <Route path="/journal" element={<JournalRoot />}>
        <Route
          path=""
          loader={journalSummaryLoader}
          element={<JournalSummary />}
        />
        <Route
          path="stats"
          loader={journalStatsLoader}
          element={<JournalStats />}
        />
        <Route
          path="questions"
          loader={journalQuestionsLoader}
          element={<JournalQuestions />}
        />
        <Route
          path=":date"
          loader={journalDayLoader}
          element={<JournalDay />}
        />
        <Route
          path=":date/edit"
          loader={journalDayEditorLoader}
          element={<JournalDayEditor />}
        />
        <Route path="all" loader={journalAllLoader} element={<JournalAll />} />
      </Route>
      <Route path="/zettel" element={<ZettelRoot />}>
        <Route path="" loader={zettelHomeLoader} element={<ZettelHome />} />
        <Route
          path="note/:noteId"
          loader={zettelNoteLoader}
          element={<ZettelNote />}
        />
        <Route
          path="editor"
          loader={zettelNoteEditorLoader}
          element={<ZettelNoteEditor />}
        />
        <Route
          path="editor/:noteId"
          loader={zettelNoteEditorLoader}
          element={<ZettelNoteEditor />}
        />
        <Route path="tags" loader={zettelTagsLoader} element={<ZettelTags />} />
        <Route
          path="graph"
          loader={zettelGraphLoader}
          element={<ZettelGraph />}
        />
      </Route>
    </Route>
  </>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export const App = () => {
  return <RouterProvider router={router} />;
};
