import { LoaderFunctionArgs } from 'react-router-dom';
import { getToday, isValidDate } from '../../Date/utils';
import { graphql, loadQuery } from 'react-relay';
import { journalDayLoaderRootQuery } from './__generated__/journalDayLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalDayRootQuery = graphql`
  query journalDayLoaderRootQuery($date: String!) {
    journal {
      journalDay(date: $date) {
        ...JournalDayMarkdown_journal
      }
    }
  }
`;

export const journalDayLoader = async ({ params }: LoaderFunctionArgs) => {
  const { date = getToday() } = params;

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const journalDayRootQueryRef = loadQuery<journalDayLoaderRootQuery>(
    relayEnvironment,
    journalDayRootQuery,
    { date }
  );

  return { date, journalDayRootQueryRef };
};
