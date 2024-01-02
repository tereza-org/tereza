'use client';

import * as React from 'react';
import { Button, Flex, Input } from '@ttoss/ui';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { Editor } from '@tereza-tech/components';
import {
  Form,
  FormField,
  FormFieldTextarea,
  useForm,
  yup,
  yupResolver,
} from '@ttoss/forms';
import { NotificationsBox, useNotifications } from '@ttoss/react-notifications';
import { ZettelNoteFormInsightsButton } from './ZettelNoteFormInsightsButton';
import {
  ZettelNoteFormSaveNoteMutation,
  ZettelNoteFormSaveNoteMutation$data,
} from './__generated__/ZettelNoteFormSaveNoteMutation.graphql';

export type ZettelNoteFormValues = {
  title?: string | null;
  content?: string | null;
  description?: string | null;
  tags?: string[];
  division?: string[];
  insights?: string[];
};

const schema: yup.ObjectSchema<ZettelNoteFormValues> = yup.object({
  title: yup.string(),
  content: yup.string().required(),
  description: yup.string(),
  tags: yup.array(yup.string().required()),
  division: yup.array(yup.string().required()),
  insights: yup.array(yup.string().required()),
});

export const ZettelNoteForm = ({
  note = {},
}: {
  note?: ZettelNoteFormValues & { id?: string };
}) => {
  const { id, ...defaultValues } = note;

  const [noteId, setNoteId] = React.useState<string | null>(id ?? null);

  const { setNotifications } = useNotifications();

  const formMethods = useForm<ZettelNoteFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = formMethods;

  const [saveNote] = useMutation<ZettelNoteFormSaveNoteMutation>(graphql`
    mutation ZettelNoteFormSaveNoteMutation($note: ZettelNoteInput!) {
      zettel {
        saveNote(note: $note) {
          id
          title
          content
          description
          tags {
            name
          }
          ...ZettelNote_zettelNote
          ...ZettelEditor_zettelNote
        }
      }
    }
  `);

  const handleSubmit = async (values: ZettelNoteFormValues) => {
    type ZettelNoteResponse =
      | NonNullable<ZettelNoteFormSaveNoteMutation$data['zettel']>['saveNote']
      | undefined;

    const note = await new Promise<ZettelNoteResponse>((resolve) => {
      saveNote({
        variables: {
          note: {
            id: noteId ?? undefined,
            ...values,
          },
        },
        onCompleted: ({ zettel }) => {
          return resolve(zettel?.saveNote);
        },
        onError: (error) => {
          setNotifications({
            message: error.message,
            type: 'error',
          });
          resolve(undefined);
        },
        updater: (store, mutationResponse) => {
          if (!mutationResponse?.zettel?.saveNote) {
            return;
          }

          /**
           * https://relay.dev/docs/guided-tour/list-data/updating-connections/
           */
          const zettelRecords = store.getRoot().getLinkedRecord('zettel');

          if (!zettelRecords) {
            return;
          }

          const connectionRecord = ConnectionHandler.getConnection(
            zettelRecords,
            'ZettelAll_notes'
          );

          if (!connectionRecord) {
            return;
          }

          const edges = connectionRecord.getLinkedRecords('edges');

          /**
           * Do not continue (append) if we are updating a note and it is
           * already in the list.
           */
          if (edges) {
            const existingEdge = edges.find((edge) => {
              const node = edge.getLinkedRecord('node');

              if (!node) {
                return false;
              }

              return node.getDataID() === mutationResponse?.zettel?.saveNote.id;
            });

            if (existingEdge) {
              return;
            }
          }

          /**
           * https://relay.dev/docs/guided-tour/list-data/updating-connections/#manually-adding-edges
           */
          const noteRecord = store.get(mutationResponse.zettel.saveNote.id);

          if (!noteRecord) {
            return;
          }

          const newEdge = ConnectionHandler.createEdge(
            store,
            connectionRecord,
            noteRecord,
            'ZettelNoteEdge'
          );

          ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
        },
      });
    });

    if (note) {
      if (!noteId) {
        setNoteId(note.id);
      }

      /**
       * Reset because API may have changed the values.
       */
      reset({
        title: note.title ?? '',
        content: note.content ?? '',
        description: note.description ?? '',
        tags: note.tags.map((tag) => {
          return tag.name;
        }),
      });
    }
  };

  return (
    <Form
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'lg',
      }}
      {...formMethods}
      onSubmit={handleSubmit}
    >
      <FormField
        name="content"
        label="Content"
        render={({ field: { onChange, value } }) => {
          return <Editor initialValue={value} onChange={onChange} />;
        }}
      />
      <ZettelNoteFormInsightsButton />
      <FormFieldTextarea name="title" label="Title" />
      <FormFieldTextarea name="description" label="Description" />
      <FormField
        name="tags"
        label="Tags (separated by semicolon)"
        render={({ field: { onChange, value } }) => {
          const joinedTags =
            value
              ?.join('; ')
              // Replace two or more spaces with one space
              .replaceAll(/\s{2,}/g, ' ') ?? '';

          return (
            <Input
              type="text"
              value={joinedTags}
              onChange={(e) => {
                const tags = e.target.value.replaceAll(',', ';').split(';');
                onChange(tags);
              }}
            />
          );
        }}
      />
      <NotificationsBox />
      <Flex sx={{ gap: 'md' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving' : 'Save'}
        </Button>
        <Button type="button">Cancel</Button>
      </Flex>
    </Form>
  );
};
