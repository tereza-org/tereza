'use client';

import * as React from 'react';
import { Markdown } from '@tereza-tech/components';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { Stack, Text } from '@ttoss/ui';
import { graphql, usePreloadedQuery } from 'react-relay';
import JournalHistoryQueryNode, {
  type JournalHistoryQuery,
} from './__generated__/JournalHistoryQuery.graphql';
import Link from 'next/link';

export const JournalHistory = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof JournalHistoryQueryNode,
    JournalHistoryQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const { journal } = usePreloadedQuery(
    graphql`
      query JournalHistoryQuery($date: String!) {
        journal {
          journal(date: $date) {
            text
            history {
              edges {
                node {
                  id
                  text
                }
              }
            }
          }
        }
      }
    `,
    queryRef
  );

  return (
    <Stack>
      <Link href={`/my/journal/${queryRef.variables.date}`}>Current</Link>
      <Markdown>{journal?.journal?.text || ''}</Markdown>
      <Text>History</Text>
      {journal?.journal?.history?.edges?.map(({ node }) => {
        return <Markdown key={node?.id || ''}>{node?.text || ''}</Markdown>;
      })}
    </Stack>
  );
};
