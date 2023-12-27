import { JournalEditor } from './JournalEditor';
import { getToday } from 'src/modules/Date/getToday';
import { isValidDate } from 'src/modules/Date/isValidDate';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalEditorQueryNode, {
  JournalEditorQuery,
} from './__generated__/JournalEditorQuery.graphql';

const JournalEditorPage = async ({ params }: { params: { date: string } }) => {
  const date = params.date || getToday();

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const preloadedQuery = await loadSerializableQuery<
    typeof JournalEditorQueryNode,
    JournalEditorQuery
  >(JournalEditorQueryNode.params, {
    date,
  });

  return <JournalEditor preloadedQuery={preloadedQuery} />;
};

export default JournalEditorPage;
