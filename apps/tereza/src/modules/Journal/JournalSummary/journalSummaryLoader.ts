import { getToday } from '../../Date/utils';
import { graphql, loadQuery } from 'react-relay';
import { journalSummaryLoaderRootQuery } from './__generated__/journalSummaryLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalSummaryRootQuery = graphql`
  query journalSummaryLoaderRootQuery($date: String!) {
    journal {
      ...JournalSummaryList_queryJournal
    }
  }
`;

export const journalSummaryLoader = async () => {
  const journalSummaryRootQueryRef = loadQuery<journalSummaryLoaderRootQuery>(
    relayEnvironment,
    journalSummaryRootQuery,
    {
      date: getToday(),
    }
  );

  return { journalSummaryRootQueryRef };
};
