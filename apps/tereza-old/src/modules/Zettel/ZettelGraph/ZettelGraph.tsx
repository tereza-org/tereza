import * as React from 'react';
import { Flex, Heading } from '@ttoss/ui';
import { GraphGroup, KnowledgeGraph } from '@tereza-tech/react-zettel';
import { ZettelGraphFragment_queryZettel$key } from './__generated__/ZettelGraphFragment_queryZettel.graphql';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useLoaderData } from 'react-router-dom';
import { zettelGraphLoader, zettelGraphRootQuery } from './zettelGraphLoader';

const editorWidthInVw = 80;

type FullWidthProps = {
  children: React.ReactNode;
};

const FullWidth = React.forwardRef<HTMLElement, FullWidthProps>(
  (props, ref) => {
    return (
      <Flex
        ref={ref}
        sx={{
          height: '75vh',
          width: [`${editorWidthInVw}vw`],
          position: 'relative',
          left: ['50%'],
          right: ['50%'],
          marginX: [`-${editorWidthInVw / 2}vw`],
          justifyContent: 'center',
        }}
      >
        {props.children}
      </Flex>
    );
  }
);

FullWidth.displayName = 'FullWidth';

const ZettelGraphKnownledgeGraph = ({
  zettel,
}: {
  zettel: ZettelGraphFragment_queryZettel$key;
}) => {
  const { graphData } = useFragment(
    graphql`
      fragment ZettelGraphFragment_queryZettel on QueryZettel {
        graphData {
          nodes {
            id
            label
            group
          }
          links {
            source
            target
          }
        }
      }
    `,
    zettel
  );

  const nodes = (graphData?.nodes || []).map((node) => {
    return {
      id: node.id,
      label: node.label || '',
      group: node.group as GraphGroup,
    };
  });

  const links = (graphData?.links || []).map((link) => {
    return {
      source: link.source,
      target: link.target,
    };
  });

  return (
    <FullWidth>
      <KnowledgeGraph
        graphData={{
          nodes,
          links,
        }}
      />
    </FullWidth>
  );
};

const ZettelGraphPreloader = () => {
  const { zettelGraphRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelGraphLoader>
  >;

  const { zettel } = usePreloadedQuery(
    zettelGraphRootQuery,
    zettelGraphRootQueryRef
  );

  if (!zettel) {
    return null;
  }

  return <ZettelGraphKnownledgeGraph zettel={zettel} />;
};

const ZettelGraph = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: '2xl',
      }}
    >
      <Heading as="h1">Zettel Graph</Heading>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ZettelGraphPreloader />
      </React.Suspense>
    </Flex>
  );
};

export default ZettelGraph;
