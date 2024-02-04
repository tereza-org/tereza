'use client';

import {
  type SerializablePreloadedQuery,
  useSerializablePreloadedQuery,
} from 'src/relay/useSerializablePreloadedQuery';
import { ZettelEditor_zettelNote$key } from './__generated__/ZettelEditor_zettelNote.graphql';
import { ZettelNoteForm } from 'src/modules/Zettel/ZettelNoteForm';
import { graphql, useFragment, usePreloadedQuery } from 'react-relay';
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

  const query = usePreloadedQuery(
    graphql`
      query ZettelEditorQuery($id: ID!) {
        zettel {
          note(id: $id) {
            ...ZettelEditor_zettelNote
          }
        }
      }
    `,
    queryRef
  );

  const data = useFragment<ZettelEditor_zettelNote$key>(
    graphql`
      fragment ZettelEditor_zettelNote on ZettelNote {
        id
        title
        content
        description
        tags {
          name
        }
        insights
        division
        references {
          reference
        }
      }
    `,
    query.zettel?.note
  );

  const note = {
    id: data?.id,
    title: data?.title ?? '',
    content: data?.content ?? '',
    description: data?.description ?? '',
    tags: (data?.tags ?? []).map((tag) => {
      return tag.name;
    }),
    insights: [...(data?.insights ?? [])],
    division: [...(data?.division ?? [])],
    references: (data?.references ?? []).map((reference) => {
      return reference.reference;
    }),
  };

  return <ZettelNoteForm note={note} />;
};
