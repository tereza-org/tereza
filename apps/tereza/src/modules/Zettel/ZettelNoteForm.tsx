'use client';

import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
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
import {
  ZettelNoteFormSaveNoteMutation,
  ZettelNoteFormSaveNoteMutation$data,
} from './__generated__/ZettelNoteFormSaveNoteMutation.graphql';
import { graphql, useMutation } from 'react-relay';

type ZettelNoteFormValues = {
  title?: string;
  content?: string;
};

const schema: yup.ObjectSchema<ZettelNoteFormValues> = yup.object({
  title: yup.string(),
  content: yup.string().required(),
});

export const ZettelNoteForm = () => {
  const [noteId, setNoteId] = React.useState<string | null>(null);

  const { setNotifications } = useNotifications();

  const formMethods = useForm<ZettelNoteFormValues>({
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
      });
    });

    if (note) {
      if (!noteId) {
        setNoteId(note.id);
      }

      reset({
        title: note.title ?? '',
        content: note.content ?? '',
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
      <FormFieldTextarea name="title" label="Title" />
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
