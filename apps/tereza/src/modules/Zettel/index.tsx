import * as React from 'react';

export { ZettelRoot } from './ZettelRoot';

export { zettelHomeLoader } from './ZettelHome/zettelHomeLoader';

export const ZettelHome = React.lazy(() => {
  return import('./ZettelHome/ZettelHome');
});

export { zettelNoteLoader } from './ZettelNote/zettelNoteLoader';

export const ZettelNote = React.lazy(() => {
  return import('./ZettelNote/ZettelNote');
});

export { zettelNoteEditorLoader } from './ZettelNoteEditor/zettelNoteEditorLoader';

export const ZettelNoteEditor = React.lazy(() => {
  return import('./ZettelNoteEditor/ZettelNoteEditor');
});

export { zettelTagsLoader } from './ZettelTags/zettelTagsLoader';

export const ZettelTags = React.lazy(() => {
  return import('./ZettelTags/ZettelTags');
});

export { zettelGraphLoader } from './ZettelGraph/zettelGraphLoader';

export const ZettelGraph = React.lazy(() => {
  return import('./ZettelGraph/ZettelGraph');
});
