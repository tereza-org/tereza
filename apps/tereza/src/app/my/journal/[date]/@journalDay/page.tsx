import { JournalDay } from './JournalDay';
import { getToday } from 'src/modules/Date/getToday';
import { loadSerializableQuery } from 'src/relay/loadSerializableQuery';
import JournalDayQueryNode, {
  JournalDayQuery,
} from './__generated__/JournalDayQuery.graphql';

const JournalDatePage = async ({ params }: { params: { date: string } }) => {
  const date = params.date || getToday();

  const preloadedQuery = await loadSerializableQuery<
    typeof JournalDayQueryNode,
    JournalDayQuery
  >(JournalDayQueryNode.params, {
    date,
  });

  return <JournalDay preloadedQuery={preloadedQuery} date={date} />;
};

export default JournalDatePage;
