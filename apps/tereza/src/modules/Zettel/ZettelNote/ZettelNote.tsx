import { Box, Button, Flex } from '@ttoss/ui';
import { DeleteZettelNote } from '../DeleteZettelNote';
import { ZettelNoteCard } from '../ZettelNoteCard';
import { ZettelNoteEditButton_zettelNote$key } from './__generated__/ZettelNoteEditButton_zettelNote.graphql';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { zettelNoteLoader, zettelNoteRootQuery } from './zettelNoteLoader';

const ZettelNoteEditButton = ({
  zettelNoteRef,
}: {
  zettelNoteRef: ZettelNoteEditButton_zettelNote$key;
}) => {
  const navigate = useNavigate();

  const { id } = useFragment(
    graphql`
      fragment ZettelNoteEditButton_zettelNote on ZettelNote {
        id
      }
    `,
    zettelNoteRef
  );

  return (
    <Button
      onClick={() => {
        navigate(`/zettel/editor/${id}`);
      }}
    >
      Edit
    </Button>
  );
};

const ZettelNote = () => {
  const { zettelNoteRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelNoteLoader>
  >;

  const { zettel } = usePreloadedQuery(
    zettelNoteRootQuery,
    zettelNoteRootQueryRef
  );

  const zettelNote = zettel?.note;

  if (!zettelNote) {
    return null;
  }

  return (
    <Box>
      <Flex>
        <ZettelNoteEditButton zettelNoteRef={zettelNote} />
      </Flex>

      <Flex
        sx={{
          marginY: 4,
        }}
      >
        <ZettelNoteCard zettelNoteRef={zettelNote} />
      </Flex>

      <DeleteZettelNote zettelNoteRef={zettelNote} />
    </Box>
  );
};

export default ZettelNote;
