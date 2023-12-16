import * as React from 'react';
import { Button, Flex, Text } from '@ttoss/ui';
import { DeleteZettelNoteMutation } from './__generated__/DeleteZettelNoteMutation.graphql';
import { DeleteZettelNote_zettelNote$key } from './__generated__/DeleteZettelNote_zettelNote.graphql';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

const zettelNoteFragment = graphql`
  fragment DeleteZettelNote_zettelNote on ZettelNote {
    id
  }
`;

const deleteZettelNoteMutation = graphql`
  mutation DeleteZettelNoteMutation($noteId: ID!) {
    zettel {
      deleteNote(id: $noteId)
    }
  }
`;

export const DeleteZettelNote = ({
  zettelNoteRef,
}: {
  zettelNoteRef: DeleteZettelNote_zettelNote$key;
}) => {
  const navigate = useNavigate();

  const zettelNote = useFragment(zettelNoteFragment, zettelNoteRef);

  const [commit, isInFlight] = useMutation<DeleteZettelNoteMutation>(
    deleteZettelNoteMutation
  );

  const handleDelete = () => {
    commit({
      variables: {
        noteId: zettelNote?.id,
      },
      onCompleted: () => {
        navigate('/zettel');
      },
    });
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);

  return (
    <>
      {!showDeleteConfirmation && (
        <Flex
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Text
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => {
              setShowDeleteConfirmation(true);
            }}
          >
            Delete?
          </Text>
        </Flex>
      )}

      {showDeleteConfirmation && (
        <Flex>
          <Text>Are you sure you want to delete this note?</Text>
          <Button
            sx={{
              backgroundColor: 'danger',
            }}
            disabled={isInFlight}
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setShowDeleteConfirmation(false);
            }}
            disabled={isInFlight}
          >
            No
          </Button>
        </Flex>
      )}
    </>
  );
};
