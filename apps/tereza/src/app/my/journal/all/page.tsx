import { JournalAll } from './JournalAll';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalAllQueryNode, {
  JournalAllQuery,
} from './__generated__/JournalAllQuery.graphql';

const JournalAllPage = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof JournalAllQueryNode,
    JournalAllQuery
  >(JournalAllQueryNode.params, {});

  return <JournalAll preloadedQuery={preloadedQuery} />;
};

export default JournalAllPage;
