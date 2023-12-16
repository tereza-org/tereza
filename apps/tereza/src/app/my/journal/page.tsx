import { JournalHome } from './JournalHome';
import { getToday } from 'src/modules/Date/getToday';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalHomeQueryNode, {
  JournalHomeQuery,
} from './__generated__/JournalHomeQuery.graphql';

const JournalPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof JournalHomeQueryNode,
    JournalHomeQuery
  >(JournalHomeQueryNode.params, {
    date: getToday(),
  });

  return <JournalHome preloadedQuery={preloadedQuery} />;
};

export default JournalPage;
