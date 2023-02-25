import * as React from 'react';
import { Flex, Heading } from '@ttoss/ui';
import { ZettelTagsQuery } from './__generated__/ZettelTagsQuery.graphql';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';
import { useLoaderData } from 'react-router-dom';

const zettelTagsQuery = graphql`
  query ZettelTagsQuery {
    zettel {
      tags
    }
  }
`;

export const zettelTagsLoader = async () => {
  const queryRef = loadQuery<ZettelTagsQuery>(
    relayEnvironment,
    zettelTagsQuery,
    {}
  );

  return { queryRef };
};

const ZettelTagsPreloader = () => {
  const { queryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelTagsLoader>
  >;

  const { zettel } = usePreloadedQuery(zettelTagsQuery, queryRef);

  const tags = zettel?.tags || [];

  return (
    <Flex>
      {tags.map((tag) => {
        return <div key={tag}>{tag}</div>;
      })}
    </Flex>
  );
};

export const ZettelTags = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Zettel Tags</Heading>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ZettelTagsPreloader />
      </React.Suspense>
    </Flex>
  );
};
