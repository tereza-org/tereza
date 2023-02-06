import { Box, Button, Flex } from '@ttoss/ui';
import { DeleteZettelNote } from './DeleteZettelNote';
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
        ...DeleteZettelNote_zettelNote
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

  if (!zettelNote) {
    return null;
  }

  return (
    <Box>
      <Flex>
        <Button
          onClick={() => {
            navigate(`/zettel/editor/${zettelNote?.id}`);
          }}
        >
          Edit
        </Button>
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
