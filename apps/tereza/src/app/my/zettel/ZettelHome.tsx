'use client';

import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, usePreloadedQuery } from 'react-relay';
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

  const a = usePreloadedQuery<ZettelHomeQuery>(
    graphql`
      query ZettelHomeQuery {
        zettel {
          notes {
            edges {
              node {
                id
                title
                group
              }
            }
          }
        }
      }
    `,
    queryRef
  );

  return <pre>{JSON.stringify(a, null, 2)}</pre>;
};
