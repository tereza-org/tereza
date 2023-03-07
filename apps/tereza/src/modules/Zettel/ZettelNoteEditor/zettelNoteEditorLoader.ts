import { LoaderFunctionArgs } from 'react-router-dom';
import { graphql, loadQuery } from 'react-relay';
import { relayEnvironment } from '../../ApiClient/relayEnvironment';
import { zettelNoteEditorLoaderRootQuery } from './__generated__/zettelNoteEditorLoaderRootQuery.graphql';

export const zettelNoteEditorRootQuery = graphql`
  query zettelNoteEditorLoaderRootQuery($noteId: ID!) {
    zettel {
      note(id: $noteId) {
        ...ZettelNoteEditor_zettelNote
      }
    }
  }
`;

export const zettelNoteEditorLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { noteId } = params;

  if (!noteId) {
    return {};
  }

  const zettelNoteEditorRootQueryRef =
    loadQuery<zettelNoteEditorLoaderRootQuery>(
      relayEnvironment,
      zettelNoteEditorRootQuery,
      { noteId }
    );

  return { zettelNoteEditorRootQueryRef };
};
