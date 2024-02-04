'use client';

import { Heading, Stack, Text } from '@ttoss/ui';
import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { graphql, usePreloadedQuery } from 'react-relay';
import Link from 'next/link';
import ZettelReferencesQueryNode, {
  type ZettelReferencesQuery,
} from './__generated__/ZettelReferencesQuery.graphql';

export const ZettelReferences = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelReferencesQueryNode,
    ZettelReferencesQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(
    preloadedQuery,
    'store-and-network'
  );

  const data = usePreloadedQuery(
    graphql`
      query ZettelReferencesQuery {
        zettel {
          references {
            edges {
              node {
                reference
                notes {
                  id
                  title
                }
              }
            }
          }
        }
      }
    `,
    queryRef
  );

  const references = data.zettel?.references?.edges.map((edge) => {
    const isLink = edge.node.reference.startsWith('http');

    return {
      reference: edge.node.reference,
      isLink,
      notes: edge.node.notes.map((note) => {
        return {
          id: note.id,
          title: note.title,
        };
      }),
    };
  });

  if (!references) {
    return <Text>No references found.</Text>;
  }

  return (
    <Stack sx={{ gap: 'xl' }}>
      <Heading>References</Heading>
      <Stack sx={{ gap: 'xl' }}>
        {references.map((reference) => {
          return (
            <Stack key={reference.reference}>
              {reference.isLink ? (
                <Link href={reference.reference} target="_blank">
                  {reference.reference}
                </Link>
              ) : (
                <Text>{reference.reference}</Text>
              )}
              <Stack
                sx={{
                  marginTop: 'xs',
                  marginLeft: 'lg',
                }}
              >
                {reference.notes.map((note) => {
                  return (
                    <Link key={note.id} href={`/my/zettel/${note.id}`}>
                      {note.title}
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
