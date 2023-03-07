import { LoaderFunctionArgs } from 'react-router-dom';
import { graphql, loadQuery } from 'react-relay';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';
import { zettelNoteLoaderRootQuery } from './__generated__/zettelNoteLoaderRootQuery.graphql';

export const zettelNoteRootQuery = graphql`
  query zettelNoteLoaderRootQuery($noteId: ID!) {
    zettel {
      note(id: $noteId) {
        ...ZettelNoteEditButton_zettelNote
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

  const zettelNoteRootQueryRef = loadQuery<zettelNoteLoaderRootQuery>(
    relayEnvironment,
    zettelNoteRootQuery,
    { noteId }
  );

  return { zettelNoteRootQueryRef };
};
