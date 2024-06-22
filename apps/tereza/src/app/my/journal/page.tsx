'use client';

import * as React from 'react';
import { JournalSummary } from './JournalSummary';
import { getToday } from 'src/modules/Date/getToday';
import { useQueryLoader } from 'react-relay';
import JournalSummaryQueryNode, {
  JournalSummaryQuery,
} from './__generated__/JournalSummaryQuery.graphql';

const JournalSummaryPage = () => {
  const [preloadedQuery, loadQuery] = useQueryLoader<JournalSummaryQuery>(
    JournalSummaryQueryNode
  );

  React.useEffect(() => {
    loadQuery({ date: getToday() });
  }, [loadQuery]);

  if (!preloadedQuery) {
    return null;
  }

  return <JournalSummary preloadedQuery={preloadedQuery} />;
};

export default JournalSummaryPage;
