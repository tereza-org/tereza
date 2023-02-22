import * as React from 'react';
import { Flex, Heading } from '@ttoss/ui';
import { JournalMarkdown } from './JournalMarkdown';
import { JournalSummaryQuery } from './__generated__/JournalSummaryQuery.graphql';
import { JournalSummary_journalSummaryItem$key } from './__generated__/JournalSummary_journalSummaryItem.graphql';
import { getToday } from '../Date/utils';
import {
  graphql,
  loadQuery,
  useFragment,
  usePreloadedQuery,
} from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useLoaderData } from 'react-router-dom';

const journalSummaryQuery = graphql`
  query JournalSummaryQuery($date: String!) {
    journal {
      summary(date: $date) {
        key
        ...JournalSummary_journalSummaryItem
      }
    }
  }
`;

export const journalSummaryLoader = async () => {
  const queryRef = loadQuery<JournalSummaryQuery>(
    relayEnvironment,
    journalSummaryQuery,
    {
      date: getToday(),
    }
  );

  return { queryRef };
};

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

const JournalSummaryPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalSummaryLoader>
  >;

  const { journal } = usePreloadedQuery(journalSummaryQuery, queryRef);

  const summary = journal?.summary || [];

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

export const JournalSummary = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Summary</Heading>
      <React.Suspense fallback={<div>Loading...</div>}>
        <JournalSummaryPreloader />
      </React.Suspense>
    </Flex>
  );
};
