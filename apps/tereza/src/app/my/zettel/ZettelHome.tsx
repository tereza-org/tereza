'use client';

import * as React from 'react';
import { Input, Stack } from '@ttoss/ui';
import {
  type PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { ZettelHomeSearchQuery } from './__generated__/ZettelHomeSearchQuery.graphql';
import Link from 'next/link';
import ZettelHomeQueryNode, {
  ZettelHomeQuery,
} from './__generated__/ZettelHomeQuery.graphql';

const zettelHomeSearchQuery = graphql`
  query ZettelHomeSearchQuery($searchText: String!) {
    zettel {
      search(text: $searchText, limit: 2) {
        id
        title
      }
    }
  }
`;

const SearchResults = ({
  searchQueryRef,
}: {
  searchQueryRef: PreloadedQuery<ZettelHomeSearchQuery>;
}) => {
  const data = usePreloadedQuery<ZettelHomeSearchQuery>(
    zettelHomeSearchQuery,
    searchQueryRef
  );

  return <pre>{JSON.stringify(data.zettel?.search, null, 2)}</pre>;
};

export const ZettelHome = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelHomeQueryNode,
    ZettelHomeQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(
    preloadedQuery,
    'store-and-network'
  );

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

  const [searchText, setSearchText] = React.useState<string>('');

  const [searchQueryRef, search, disposeSearchQuery] =
    useQueryLoader<ZettelHomeSearchQuery>(zettelHomeSearchQuery);

  React.useEffect(() => {
    if (searchText) {
      search({ searchText });
    }

    return disposeSearchQuery;
  }, [disposeSearchQuery, search, searchText]);

  return (
    <Stack>
      <Input
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {searchQueryRef && <SearchResults searchQueryRef={searchQueryRef} />}
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
