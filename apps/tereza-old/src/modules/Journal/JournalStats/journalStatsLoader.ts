import { getToday } from '../../Date/utils';
import { graphql, loadQuery } from 'react-relay';
import { journalStatsLoaderRootQuery } from './__generated__/journalStatsLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalStatsRootQuery = graphql`
  query journalStatsLoaderRootQuery($today: String!) {
    journal {
      stats(today: $today) {
        ...JournalStatsTexts_journalStats
        ...JournalStatsGroupDates_journalStats
      }
    }
  }
`;

export const journalStatsLoader = async () => {
  const journalStatsRootQueryRef = loadQuery<journalStatsLoaderRootQuery>(
    relayEnvironment,
    journalStatsRootQuery,
    {
      today: getToday(),
    }
  );

  return { journalStatsRootQueryRef };
};
