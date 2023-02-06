import * as React from 'react';
import { Box, Button, Flex, Text } from '@ttoss/ui';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { ZettelNoteCard } from './ZettelNoteCard';
import { ZettelNoteLoaderQuery } from './__generated__/ZettelNoteLoaderQuery.graphql';
import { graphql, loadQuery, usePreloadedQuery } from 'react-relay';
import { relayEnvironment } from '../ApiClient/relayEnvironment';

const zettelNoteLoaderQuery = graphql`
  query ZettelNoteLoaderQuery($noteId: ID!) {
    zettel {
      note: getNote(id: $noteId) {
        id
        ...ZettelNoteCard_zettelNote
      }
    }
  }
`;

export const zettelNoteLoader = async ({ params }: LoaderFunctionArgs) => {
  const { noteId } = params;

  if (!noteId) {
    throw new Error('No noteId provided');
  }

  const zettelNoteLoaderQueryRef = loadQuery<ZettelNoteLoaderQuery>(
    relayEnvironment,
    zettelNoteLoaderQuery,
    { noteId }
  );

  return { zettelNoteLoaderQueryRef };
};

export const ZettelNote = () => {
  const navigate = useNavigate();

  const { zettelNoteLoaderQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelNoteLoader>
  >;

  const { zettel } = usePreloadedQuery(
    zettelNoteLoaderQuery,
    zettelNoteLoaderQueryRef
  );

  const zettelNote = zettel?.note;

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);

  return (
    <Box>
      {!showDeleteConfirmation && (
        <Flex>
          <Button
            onClick={() => {
              navigate(`/zettel/editor/${zettelNote?.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            sx={{
              backgroundColor: 'danger',
            }}
            onClick={() => {
              setShowDeleteConfirmation(true);
            }}
          >
            Delete
          </Button>
        </Flex>
      )}
      {showDeleteConfirmation && (
        <Flex>
          <Text>Are you sure you want to delete this note?</Text>
          <Button
            sx={{
              backgroundColor: 'danger',
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setShowDeleteConfirmation(false);
            }}
          >
            No
          </Button>
        </Flex>
      )}
      {zettelNote && <ZettelNoteCard zettelNoteRef={zettelNote} />}
    </Box>
  );
};
