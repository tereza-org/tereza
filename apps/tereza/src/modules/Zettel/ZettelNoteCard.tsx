import { Box, Heading, Text } from '@ttoss/ui';
import { ZettelNoteCard_zettelNote$key } from './__generated__/ZettelNoteCard_zettelNote.graphql';
import { graphql, useFragment } from 'react-relay';

const zettelNoteFragment = graphql`
  fragment ZettelNoteCard_zettelNote on ZettelNote {
    title
    description
    content
  }
`;

export const ZettelNoteCard = ({
  zettelNoteRef,
}: {
  zettelNoteRef: ZettelNoteCard_zettelNote$key;
}) => {
  const { title, description, content } = useFragment(
    zettelNoteFragment,
    zettelNoteRef
  );

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid',
        padding: 3,
      }}
    >
      <Heading as="h3">{title}</Heading>
      <Text as="p">{description}</Text>
      <Text as="p">{content}</Text>
    </Box>
  );
};
