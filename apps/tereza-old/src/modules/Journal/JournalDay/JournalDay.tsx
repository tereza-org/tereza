import { Box, Flex, Heading } from '@ttoss/ui';
import { DatePicker } from '../../Date/DatePicker';
import { JournalDayMarkdown_journal$key } from './__generated__/JournalDayMarkdown_journal.graphql';
import { JournalMarkdown } from '../JournalMarkdown';
import { Suspense } from '../../Layout';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { journalDayLoader, journalDayRootQuery } from './journalDayLoader';
import { useLoaderData, useNavigate } from 'react-router-dom';

const JournalDayMarkdown = ({
  journalRef,
}: {
  journalRef: JournalDayMarkdown_journal$key;
}) => {
  const { date, text } = useFragment(
    graphql`
      fragment JournalDayMarkdown_journal on Journal {
        date
        text
      }
    `,
    journalRef
  );

  return <JournalMarkdown date={date} label={date} text={text} />;
};

const JournalDayPreloader = () => {
  const { journalDayRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  const { journal } = usePreloadedQuery(
    journalDayRootQuery,
    journalDayRootQueryRef
  );

  if (!journal?.journalDay) {
    return null;
  }

  return <JournalDayMarkdown journalRef={journal.journalDay} />;
};

const JournalDay = () => {
  const navigate = useNavigate();

  const { date } = useLoaderData() as Awaited<
    ReturnType<typeof journalDayLoader>
  >;

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Day</Heading>
      <DatePicker
        value={date}
        onChange={(date) => {
          navigate(`/journal/${date}`);
        }}
      />
      <Box>
        <Heading
          as="h3"
          sx={{
            marginBottom: 'md',
          }}
        >
          On this day
        </Heading>
        <Suspense>
          <JournalDayPreloader />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default JournalDay;
