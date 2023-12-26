'use client';

import * as React from 'react';
import { Box, Flex, Stack, Text } from '@ttoss/ui';
import {
  ConnectionHandler,
  graphql,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { ZettelNoteCard } from 'src/modules/Zettel/ZettelNoteCard';
import { type ZettelNoteDeleteMutation } from './__generated__/ZettelNoteDeleteMutation.graphql';
import { type ZettelNoteDelete_zettelNote$key } from './__generated__/ZettelNoteDelete_zettelNote.graphql';
import { useRouter } from 'next/navigation';
import ZettelNoteQueryNode, {
  type ZettelNoteQuery,
} from './__generated__/ZettelNoteQuery.graphql';

const DeleteZettelNote = ({
  zettelNoteRef,
}: {
  zettelNoteRef: ZettelNoteDelete_zettelNote$key;
}) => {
  const router = useRouter();

  const note = useFragment(
    graphql`
      fragment ZettelNoteDelete_zettelNote on ZettelNote {
        id
      }
    `,
    zettelNoteRef
  );

  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const [error, setError] = React.useState<Error | null>(null);

  const [deleteZettelNote] = useMutation<ZettelNoteDeleteMutation>(graphql`
    mutation ZettelNoteDeleteMutation($id: ID!) {
      zettel {
        deleteNote(id: $id) {
          deleted
        }
      }
    }
  `);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (confirmDelete) {
    return (
      <Flex sx={{ gap: 'lg' }}>
        <Text
          sx={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => {
            return deleteZettelNote({
              variables: {
                id: note.id,
              },
              onCompleted: () => {
                return router.push('/my/zettel');
              },
              onError: (error) => {
                return setError(error);
              },
              updater: (store) => {
                /**
                 * https://relay.dev/docs/guided-tour/list-data/updating-connections/
                 */
                const zettelRecords = store.getRoot().getLinkedRecord('zettel');

                if (!zettelRecords) {
                  return;
                }

                const connectionRecord = ConnectionHandler.getConnection(
                  zettelRecords,
                  'ZettelAll_notes'
                );

                if (!connectionRecord) {
                  return;
                }

                ConnectionHandler.deleteNode(connectionRecord, note.id);
              },
            });
          }}
        >
          Are you sure?
        </Text>
        <Text
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => {
            return setConfirmDelete(false);
          }}
        >
          Cancel
        </Text>
      </Flex>
    );
  }

  return (
    <Text
      sx={{
        color: 'red',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}
      onClick={() => {
        return setConfirmDelete(true);
      }}
    >
      Do you want to delete it?
    </Text>
  );
};

export const ZettelNote = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelNoteQueryNode,
    ZettelNoteQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const data = usePreloadedQuery(
    graphql`
      query ZettelNoteQuery($id: ID!) {
        zettel {
          note(id: $id) {
            id
            title
            content
            ...ZettelNoteDelete_zettelNote
          }
        }
      }
    `,
    queryRef
  );

  if (!data.zettel?.note) {
    return 'Note not found';
  }

  const note = { ...data.zettel?.note };

  return (
    <Stack>
      <ZettelNoteCard note={note} />
      <Box
        sx={{
          marginTop: '2xl',
        }}
      >
        <DeleteZettelNote zettelNoteRef={data.zettel.note} />
      </Box>
    </Stack>
  );
};
