import { Flex, Heading } from '@ttoss/ui';
import { JournalMarkdown } from '../JournalMarkdown';
import { JournalSummaryList_queryJournal$key } from './__generated__/JournalSummaryList_queryJournal.graphql';
import { JournalSummary_journalSummaryItem$key } from './__generated__/JournalSummary_journalSummaryItem.graphql';
import { Suspense } from '../../Layout';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import {
  journalSummaryLoader,
  journalSummaryRootQuery,
} from './journalSummaryLoader';
import { useLoaderData } from 'react-router-dom';

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

const JournalSummaryList = ({
  queryJournalRef,
}: {
  queryJournalRef: JournalSummaryList_queryJournal$key;
}) => {
  const { summary } = useFragment(
    graphql`
      fragment JournalSummaryList_queryJournal on QueryJournal {
        summary(date: $date) {
          key
          ...JournalSummary_journalSummaryItem
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

const JournalSummaryPreloader = () => {
  const { journalSummaryRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalSummaryLoader>
  >;

  const { journal } = usePreloadedQuery(
    journalSummaryRootQuery,
    journalSummaryRootQueryRef
  );

  if (!journal) {
    return null;
  }

  return <JournalSummaryList queryJournalRef={journal} />;
};

const JournalSummary = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Journal Summary</Heading>
      <Suspense>
        <JournalSummaryPreloader />
      </Suspense>
    </Flex>
  );
};

export default JournalSummary;
