import { JournalDay } from './JournalDay';
import { getToday } from 'src/modules/Date/getToday';
import { isValidDate } from 'src/modules/Date/isValidDate';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalDayQueryNode, {
  JournalDayQuery,
} from './__generated__/JournalDayQuery.graphql';

const JournalDayPage = async ({ params }: { params: { date: string } }) => {
  const date = params.date || getToday();

  if (!isValidDate(date)) {
    throw new Error('Invalid date');
  }

  const preloadedQuery = await loadSerializableQuery<
    typeof JournalDayQueryNode,
    JournalDayQuery
  >(JournalDayQueryNode.params, {
    date,
  });

  return <JournalDay preloadedQuery={preloadedQuery} />;
};

export default JournalDayPage;
