import { LoaderFunctionArgs } from 'react-router-dom';
import { getToday, isValidDate } from '../../Date/utils';
import { graphql, loadQuery } from 'react-relay';
import { journalDayEditorLoaderRootQuery } from './__generated__/journalDayEditorLoaderRootQuery.graphql';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';

export const journalDayEditorRootQuery = graphql`
  query journalDayEditorLoaderRootQuery($date: String!) {
    journal {
      ...JournalDayEditorNoEntryMessage_queryJournal
      journalDay(date: $date) {
        ...JournalDayEditor_journal
      }
    }
  }
`;

export const journalDayEditorLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { date = getToday() } = params;

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const journalDayEditorRootQueryRef =
    loadQuery<journalDayEditorLoaderRootQuery>(
      relayEnvironment,
      journalDayEditorRootQuery,
      { date }
    );

  return { date, journalDayEditorRootQueryRef };
};
