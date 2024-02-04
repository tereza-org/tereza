'use client';

import * as React from 'react';
import {
  type PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay';
import { Search } from '@ttoss/components';
import {
  SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { Stack } from '@ttoss/ui';
import { ZettelHomeSearchQuery } from './__generated__/ZettelHomeSearchQuery.graphql';
import Link from 'next/link';
import ZettelHomeQueryNode, {
  ZettelHomeQuery,
} from './__generated__/ZettelHomeQuery.graphql';

type SearchResult = {
  id: string;
  title?: string | null;
};

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

const SearchResults = ({ results = [] }: { results?: SearchResult[] }) => {
  return (
    <>
      {results?.map((result) => {
        const href = `/my/zettel/${result?.id}`;
        return (
          <Link key={result?.id} href={href}>
            {result?.title || '(No title)'}
          </Link>
        );
      })}
    </>
  );
};

const HandleSearch = ({
  searchQueryRef,
}: {
  searchQueryRef: PreloadedQuery<ZettelHomeSearchQuery>;
}) => {
  const data = usePreloadedQuery<ZettelHomeSearchQuery>(
    zettelHomeSearchQuery,
    searchQueryRef
  );

  const results = [...(data.zettel?.search || [])];

  return <SearchResults results={results} />;
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

  const defaultResults =
    data.zettel?.notes?.edges.map((edge) => {
      return edge?.node;
    }) || [];

  const [searchText, setSearchText] = React.useState<string | undefined>('');

  const [searchQueryRef, search, disposeSearchQuery] =
    useQueryLoader<ZettelHomeSearchQuery>(zettelHomeSearchQuery);

  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (searchText) {
      startTransition(() => {
        search({ searchText });
      });
    }

    return disposeSearchQuery;
  }, [disposeSearchQuery, search, searchText]);

  return (
    <Stack>
      <Search
        sx={{
          marginBottom: 'lg',
        }}
        value={searchText}
        onChange={(newSearchText) => {
          setSearchText(newSearchText as string);
        }}
        loading={isPending}
      />
      {searchQueryRef ? (
        <HandleSearch searchQueryRef={searchQueryRef} />
      ) : (
        <SearchResults results={defaultResults} />
      )}
    </Stack>
  );
};
