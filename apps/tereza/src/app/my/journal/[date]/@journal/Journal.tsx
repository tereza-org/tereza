'use client';

import { Box, Heading } from '@ttoss/ui';
import { JournalMarkdown as JournalMarkdownComponent } from 'src/modules/Journal/JournalMarkdown';
import { JournalMarkdown_journal$key } from './__generated__/JournalMarkdown_journal.graphql';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import JournalQueryNode, {
  JournalQuery,
} from './__generated__/JournalQuery.graphql';
import Link from 'next/link';

const JournalMarkdown = ({
  journalRef,
}: {
  journalRef: JournalMarkdown_journal$key;
}) => {
  const { date, text } = useFragment(
    graphql`
      fragment JournalMarkdown_journal on Journal {
        date
        text
      }
    `,
    journalRef
  );

  return <JournalMarkdownComponent date={date} label={date} text={text} />;
};

export const Journal = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalQueryNode,
    JournalQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalQuery($date: String!) {
        journal {
          journal(date: $date) {
            ...JournalMarkdown_journal
          }
        }
      }
    `,
    queryRef
  );

  if (!journal?.journal) {
    return 'No journal entry for this day.';
  }

  const date = queryRef.variables.date;

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
      <JournalMarkdown journalRef={journal.journal} />
      <Box sx={{ marginTop: 'lg' }}>
        <Link href={`/my/journal/${date}/history`}>History</Link>
        <Link href={`/my/journal/${date}/editor`}>Editor</Link>
      </Box>
    </Box>
  );
};
