'use client';

import { Box, Heading } from '@ttoss/ui';
import { JournalDayMarkdown_journal$key } from './__generated__/JournalDayMarkdown_journal.graphql';
import { JournalMarkdown } from 'src/modules/Journal/JournalMarkdown';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
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
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalDayQueryNode,
    JournalDayQuery
  >;
}) => {
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
    <Box>
      <Heading
        as="h3"
        sx={{
          marginBottom: 'md',
        }}
      >
        On this day
      </Heading>
      <JournalDayMarkdown journalRef={journal.journalDay} />
    </Box>
  );
};
