import { Flex, Heading } from '@ttoss/ui';
import { Suspense } from '../../Layout';
import { ZettelTagsList_queryZettel$key } from './__generated__/ZettelTagsList_queryZettel.graphql';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useLoaderData } from 'react-router-dom';
import { zettelTagsLoader, zettelTagsRootQuery } from './zettelTagsLoader';

const TagsList = ({
  queryZettelRef,
}: {
  queryZettelRef: ZettelTagsList_queryZettel$key;
}) => {
  const { tags } = useFragment(
    graphql`
      fragment ZettelTagsList_queryZettel on QueryZettel {
        tags
      }
    `,
    queryZettelRef
  );

  return (
    <Flex
      sx={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'xl',
      }}
    >
      {tags.map((tag) => {
        return <div key={tag}>{tag}</div>;
      })}
    </Flex>
  );
};

const ZettelTagsPreloader = () => {
  const { zettelTagsRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelTagsLoader>
  >;

  const { zettel } = usePreloadedQuery(
    zettelTagsRootQuery,
    zettelTagsRootQueryRef
  );

  if (!zettel) {
    return null;
  }

  return <TagsList queryZettelRef={zettel} />;
};

const ZettelTags = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Zettel Tags</Heading>
      <Suspense>
        <ZettelTagsPreloader />
      </Suspense>
    </Flex>
  );
};

export default ZettelTags;
