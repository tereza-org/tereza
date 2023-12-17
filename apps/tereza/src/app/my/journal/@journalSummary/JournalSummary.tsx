'use client';

import { Flex } from '@ttoss/ui';
import { JournalMarkdown } from 'src/modules/Journal/JournalMarkdown';
import { JournalSummary_journalSummaryItem$key } from './__generated__/JournalSummary_journalSummaryItem.graphql';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import JournalSummaryQueryNode, {
  JournalSummaryQuery,
} from './__generated__/JournalSummaryQuery.graphql';

const JournalSummaryItem = ({
  journalSummaryItemRef,
}: {
  journalSummaryItemRef: JournalSummary_journalSummaryItem$key;
}) => {
  const { key, journal } = useFragment(
    graphql`
      fragment JournalSummary_journalSummaryItem on JournalSummaryItem {
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

export const JournalSummary = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalSummaryQueryNode,
    JournalSummaryQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalSummaryQuery($date: String!) {
        journal {
          summary(date: $date) {
            key
            ...JournalSummary_journalSummaryItem
          }
        }
      }
    `,
    queryRef
  );

  if (!journal) {
    return null;
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '3xl',
      }}
    >
      {journal.summary.map((item) => {
        return (
          <JournalSummaryItem key={item.key} journalSummaryItemRef={item} />
        );
      })}
    </Flex>
  );
};
