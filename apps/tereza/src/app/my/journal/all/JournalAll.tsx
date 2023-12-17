'use client';

import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
import { JournalAllJournalListFragment_query$key } from './__generated__/JournalAllJournalListFragment_query.graphql';
import { JournalAll_journal$key } from './__generated__/JournalAll_journal.graphql';
import { JournalMarkdown } from 'src/modules/Journal/JournalMarkdown';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import {
  graphql,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from 'react-relay';
import JournalAllQueryNode, {
  JournalAllQuery,
} from './__generated__/JournalAllQuery.graphql';

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

export const JournalAll = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalAllQueryNode,
    JournalAllQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const query = usePreloadedQuery(
    graphql`
      query JournalAllQuery {
        ...JournalAllJournalListFragment_query
      }
    `,
    queryRef
  );

  return <JournalList queryRef={query} />;
};
