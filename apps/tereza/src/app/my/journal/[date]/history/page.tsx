import { JournalHistory } from './JournalHistory';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalHistoryQueryNode, {
  type JournalHistoryQuery,
} from './__generated__/JournalHistoryQuery.graphql';

const JournalHistoryPage = async ({ params }: { params: { date: string } }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof JournalHistoryQueryNode,
    JournalHistoryQuery
  >(JournalHistoryQueryNode.params, {
    date: params.date,
  });

  return <JournalHistory preloadedQuery={preloadedQuery} />;
};

export default JournalHistoryPage;
