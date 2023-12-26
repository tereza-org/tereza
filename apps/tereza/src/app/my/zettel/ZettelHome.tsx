'use client';

import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { Stack } from '@ttoss/ui';
import { graphql, usePreloadedQuery } from 'react-relay';
import Link from 'next/link';
import ZettelHomeQueryNode, {
  ZettelHomeQuery,
} from './__generated__/ZettelHomeQuery.graphql';

export const ZettelHome = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelHomeQueryNode,
    ZettelHomeQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const data = usePreloadedQuery<ZettelHomeQuery>(
    graphql`
      query ZettelHomeQuery {
        zettel {
          notes {
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
    queryRef
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
    </Stack>
  );
};
