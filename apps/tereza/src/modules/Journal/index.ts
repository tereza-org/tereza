import * as React from 'react';

export { JournalRoot } from './JournalRoot';

export { journalSummaryLoader } from './JournalSummary/journalSummaryLoader';

export const JournalSummary = React.lazy(() => {
  return import('./JournalSummary/JournalSummary');
});

export { journalStatsLoader } from './JournalStats/journalStatsLoader';

export const JournalStats = React.lazy(() => {
  return import('./JournalStats/JournalStats');
});

export { journalQuestionsLoader } from './JournalQuestions/journalQuestionsLoader';

export const JournalQuestions = React.lazy(() => {
  return import('./JournalQuestions/JournalQuestions');
});

export { journalDayLoader } from './JournalDay/journalDayLoader';

export const JournalDay = React.lazy(() => {
  return import('./JournalDay/JournalDay');
});

export { journalDayEditorLoader } from './JournalDayEditor/journalDayEditorLoader';

export const JournalDayEditor = React.lazy(() => {
  return import('./JournalDayEditor/JournalDayEditor');
});

export { journalAllLoader } from './JournalAll/journalAllLoader';

export const JournalAll = React.lazy(() => {
  return import('./JournalAll/JournalAll');
});
