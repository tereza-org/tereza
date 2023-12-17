import { JournalDayEditor } from './JournalDayEditor';
import { getToday } from 'src/modules/Date/getToday';
import { isValidDate } from 'src/modules/Date/isValidDate';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalDayEditorQueryNode, {
  JournalDayEditorQuery,
} from './__generated__/JournalDayEditorQuery.graphql';

const JournalDayEditorPage = async ({
  params,
}: {
  params: { date: string };
}) => {
  const date = params.date || getToday();

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const preloadedQuery = await loadSerializableQuery<
    typeof JournalDayEditorQueryNode,
    JournalDayEditorQuery
  >(JournalDayEditorQueryNode.params, {
    date,
  });

  return <JournalDayEditor preloadedQuery={preloadedQuery} />;
};

export default JournalDayEditorPage;
