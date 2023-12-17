import { JournalSummary } from './JournalSummary';
import { getToday } from 'src/modules/Date/getToday';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalSummaryQueryNode, {
  JournalSummaryQuery,
} from './__generated__/JournalSummaryQuery.graphql';

const JournalSummaryPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof JournalSummaryQueryNode,
    JournalSummaryQuery
  >(JournalSummaryQueryNode.params, {
    date: getToday(),
  });

  return <JournalSummary preloadedQuery={preloadedQuery} />;
};

export default JournalSummaryPage;
