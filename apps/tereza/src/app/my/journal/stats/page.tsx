import { JournalStats } from './JournalStats';
import { getToday } from 'src/modules/Date/getToday';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalStatsQueryNode, {
  JournalStatsQuery,
} from './__generated__/JournalStatsQuery.graphql';

const JournalStatsPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof JournalStatsQueryNode,
    JournalStatsQuery
  >(JournalStatsQueryNode.params, {
    today: getToday(),
  });

  return <JournalStats preloadedQuery={preloadedQuery} />;
};

export default JournalStatsPage;
