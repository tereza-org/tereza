'use client';

import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { ZettelNoteForm } from 'src/modules/Zettel/ZettelNoteForm';
import { graphql, usePreloadedQuery } from 'react-relay';
import ZettelEditorQueryNode, {
  type ZettelEditorQuery,
} from './__generated__/ZettelEditorQuery.graphql';

export const ZettelEditor = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof ZettelEditorQueryNode,
    ZettelEditorQuery
  >;
}) => {
  const queryRef = useSerializablePreloadedQuery(preloadedQuery);

  const data = usePreloadedQuery(
    graphql`
      query ZettelEditorQuery($id: ID!) {
        zettel {
          note(id: $id) {
            id
            title
            content
          }
        }
      }
    `,
    queryRef
  );

  const note = { ...data.zettel?.note };

  return <ZettelNoteForm note={note} />;
};
