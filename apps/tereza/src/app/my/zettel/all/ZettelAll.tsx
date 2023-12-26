'use client';

import { Button, Stack } from '@ttoss/ui';
import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { type ZettelAll_query$key } from './__generated__/ZettelAll_query.graphql';
import { graphql, usePaginationFragment, usePreloadedQuery } from 'react-relay';
import Link from 'next/link';
import ZettelAllQueryNode, {
  type ZettelAllQuery,
} from './__generated__/ZettelAllQuery.graphql';

export const ZettelAll = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelAllQueryNode,
    ZettelAllQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const query = usePreloadedQuery(
    graphql`
      query ZettelAllQuery {
        ...ZettelAll_query
      }
    `,
    queryRef
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ZettelAllQuery,
    ZettelAll_query$key
  >(
    graphql`
      fragment ZettelAll_query on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 50 }
        cursor: { type: "String" }
      )
      @refetchable(queryName: "ZettelAllPaginationQuery") {
        zettel {
          notes(first: $count, after: $cursor)
            @connection(key: "ZettelAll_notes") {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `,
    query
  );

  const notes = data.zettel?.notes?.edges?.map((edge) => {
    return { ...edge?.node, title: edge?.node?.title || '(No title)' };
  });

  return (
    <Stack>
      {notes?.map((note) => {
        const href = `/my/zettel/${note?.id}`;
        return (
          <Link key={note?.id} href={href}>
            {note?.title}
          </Link>
        );
      })}
      {hasNext && (
        <Button
          sx={{
            marginTop: 'xl',
          }}
          disabled={isLoadingNext}
          onClick={() => {
            return loadNext(50);
          }}
        >
          {isLoadingNext ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </Stack>
  );
};
