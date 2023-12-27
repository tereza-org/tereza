import { Journal } from './Journal';
import { getToday } from 'src/modules/Date/getToday';
import { isValidDate } from 'src/modules/Date/isValidDate';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalQueryNode, {
  JournalQuery,
} from './__generated__/JournalQuery.graphql';

const JournalPage = async ({ params }: { params: { date: string } }) => {
  const date = params.date || getToday();

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const preloadedQuery = await loadSerializableQuery<
    typeof JournalQueryNode,
    JournalQuery
  >(JournalQueryNode.params, {
    date,
  });

  return <Journal preloadedQuery={preloadedQuery} />;
};

export default JournalPage;
