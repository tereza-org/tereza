import * as React from 'react';
import { Button, Flex, Heading } from '@ttoss/ui';
import { JournalAllJournalListFragment_query$key } from './__generated__/JournalAllJournalListFragment_query.graphql';
import { JournalAll_journal$key } from './__generated__/JournalAll_journal.graphql';
import { JournalMarkdown } from '../JournalMarkdown';
import {
  graphql,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from 'react-relay';
import { journalAllLoader, journalAllRootQuery } from './journalAllLoader';
import { useLoaderData } from 'react-router-dom';

const Journal = ({ journalRef }: { journalRef: JournalAll_journal$key }) => {
  const { date, text } = useFragment(
    graphql`
      fragment JournalAll_journal on Journal {
        date
        text
      }
    `,
    journalRef
  );

  const label = date;

  return <JournalMarkdown label={label} text={text} date={date} />;
};

const JournalList = ({
  queryRef,
}: {
  queryRef: JournalAllJournalListFragment_query$key;
}) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment JournalAllJournalListFragment_query on Query
      @refetchable(queryName: "JournalAllJournalListFragmentPaginationQuery")
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 7 }
      ) {
        journal {
          journals(after: $cursor, first: $count, sort: DATE_DESC)
            @connection(key: "JournalAllJournalListFragment_journals") {
            edges {
              node {
                id
                ...JournalAll_journal
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `,
    queryRef
  );

  const onLoadMore = () => {
    loadNext(7);
  };

  const edges = data.journal?.journals?.edges || [];

  return (
    <>
      <Flex
        sx={{
          flexDirection: 'column',
          gap: '2xl',
        }}
      >
        {edges.map(({ node }) => {
          return <Journal key={node.id} journalRef={node} />;
        })}
      </Flex>
      <Button onClick={onLoadMore} disabled={isLoadingNext}>
        Load Mode
      </Button>
    </>
  );
};

const JournalAllPreloader = () => {
  const { journalAllRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof journalAllLoader>
  >;

  const query = usePreloadedQuery(journalAllRootQuery, journalAllRootQueryRef);

  return <JournalList queryRef={query} />;
};

const JournalAll = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">All Journals</Heading>
      <React.Suspense fallback={<div>Loading...</div>}>
        <JournalAllPreloader />
      </React.Suspense>
    </Flex>
  );
};

export default JournalAll;
