import { Box, Button, Flex } from '@ttoss/ui';
import { DeleteZettelNote } from '../DeleteZettelNote';
import { Markdown } from '@tereza-tech/components';
import { ZettelNoteCard } from '../ZettelNoteCard';
import { ZettelNoteContent_zettelNote$key } from './__generated__/ZettelNoteContent_zettelNote.graphql';
import { ZettelNoteEditButton_zettelNote$key } from './__generated__/ZettelNoteEditButton_zettelNote.graphql';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { zettelNoteLoader, zettelNoteRootQuery } from './zettelNoteLoader';

const ZettelContent = ({
  zettelNoteRef,
}: {
  zettelNoteRef: ZettelNoteContent_zettelNote$key;
}) => {
  const zettelNote = useFragment(
    graphql`
      fragment ZettelNoteContent_zettelNote on ZettelNote {
        content
      }
    `,
    zettelNoteRef
  );

  const content = zettelNote?.content || '';

  return <Markdown>{content}</Markdown>;
};

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
          flexDirection: 'column',
          marginY: 'lg',
        }}
      >
        <ZettelNoteCard zettelNoteRef={zettelNote} />
        <ZettelContent zettelNoteRef={zettelNote} />
      </Flex>

      <DeleteZettelNote zettelNoteRef={zettelNote} />
    </Box>
  );
};

export default ZettelNote;
