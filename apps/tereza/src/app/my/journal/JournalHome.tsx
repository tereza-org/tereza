'use client';

import { Flex } from '@ttoss/ui';
import { JournalHome_journalSummaryItem$key } from './__generated__/JournalHome_journalSummaryItem.graphql';
import { JournalHome_queryJournal$key } from './__generated__/JournalHome_queryJournal.graphql';
import { JournalMarkdown } from 'src/modules/Journal/JournalMarkdown';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import JournalHomeQueryNode, {
  JournalHomeQuery,
} from './__generated__/JournalHomeQuery.graphql';

const JournalSummaryItem = ({
  journalSummaryItemRef,
}: {
  journalSummaryItemRef: JournalHome_journalSummaryItem$key;
}) => {
  const { key, journal } = useFragment(
    graphql`
      fragment JournalHome_journalSummaryItem on JournalSummaryItem {
        key
        journal {
          date
          text
        }
      }
    `,
    journalSummaryItemRef
  );

  const label = [key, journal?.date].join(' - ');

  return (
    <JournalMarkdown label={label} text={journal.text} date={journal.date} />
  );
};

const JournalSummaryList = ({
  queryJournalRef,
}: {
  queryJournalRef: JournalHome_queryJournal$key;
}) => {
  const { summary } = useFragment(
    graphql`
      fragment JournalHome_queryJournal on QueryJournal {
        summary(date: $date) {
          key
          ...JournalHome_journalSummaryItem
        }
      }
    `,
    queryJournalRef
  );

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '3xl',
      }}
    >
      {summary.map((item) => {
        return (
          <JournalSummaryItem key={item.key} journalSummaryItemRef={item} />
        );
      })}
    </Flex>
  );
};

export const JournalHome = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalHomeQueryNode,
    JournalHomeQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalHomeQuery($date: String!) {
        journal {
          ...JournalHome_queryJournal
        }
      }
    `,
    queryRef
  );

  if (!journal) {
    return null;
  }

  return <JournalSummaryList queryJournalRef={journal} />;
};
