'use client';

import { Box, Flex, Heading } from '@ttoss/ui';
import { DatePicker } from 'src/modules/Date/DatePicker';
import { JournalDayMarkdown_journal$key } from './__generated__/JournalDayMarkdown_journal.graphql';
import { JournalMarkdown } from 'src/modules/Journal/JournalMarkdown';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useRouter } from 'next/navigation';
import JournalDayQueryNode, {
  JournalDayQuery,
} from './__generated__/JournalDayQuery.graphql';

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

export const JournalDay = ({
  date,
  preloadedQuery,
}: {
  date: string;
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalDayQueryNode,
    JournalDayQuery
  >;
}) => {
  const router = useRouter();

  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalDayQuery($date: String!) {
        journal {
          journalDay(date: $date) {
            ...JournalDayMarkdown_journal
          }
        }
      }
    `,
    queryRef
  );

  if (!journal?.journalDay) {
    return 'No journal entry for this day.';
  }

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
          router.push(`/my/journal/${date}`);
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
        <JournalDayMarkdown journalRef={journal.journalDay} />;
      </Box>
    </Flex>
  );
};
