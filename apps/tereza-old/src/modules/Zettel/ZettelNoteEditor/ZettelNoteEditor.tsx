import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
import { Editor } from '@tereza-tech/components';
import {
  Form,
  FormField,
  FormFieldInput,
  useForm,
  yup,
  yupResolver,
} from '@ttoss/forms';
import {
  PreloadedQuery,
  graphql,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { ZettelInsights } from '../ZettelInsights';
import { ZettelNoteEditorSaveZettelNoteMutation } from './__generated__/ZettelNoteEditorSaveZettelNoteMutation.graphql';
import { ZettelNoteEditor_zettelNote$key } from './__generated__/ZettelNoteEditor_zettelNote.graphql';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  zettelNoteEditorLoader,
  zettelNoteEditorRootQuery,
} from './zettelNoteEditorLoader';
import { zettelNoteEditorLoaderRootQuery } from './__generated__/zettelNoteEditorLoaderRootQuery.graphql';

const zettelNoteFragment = graphql`
  fragment ZettelNoteEditor_zettelNote on ZettelNote {
    id
    title
    group
    tags
    description
    content
  }
`;

const zettelNoteEditorSaveZettelNoteMutation = graphql`
  mutation ZettelNoteEditorSaveZettelNoteMutation($note: ZettelNoteInput!) {
    zettel {
      saveNote(note: $note) {
        id
        ...ZettelNoteEditor_zettelNote
      }
    }
  }
`;

const schema = yup.object({
  id: yup.string(),
  title: yup.string().required(),
  group: yup.string().required(),
  tags: yup.string(),
  description: yup.string(),
  content: yup.string(),
});

type ZettelNoteFormValues = yup.InferType<typeof schema>;

const ZettelNoteForm = ({
  defaultValues,
}: {
  defaultValues?: Partial<ZettelNoteFormValues>;
}) => {
  const navigate = useNavigate();

  const formMethods = useForm<ZettelNoteFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      group: 'zettel/',
      ...defaultValues,
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = formMethods;

  const [noteId, setNoteId] = React.useState<string | undefined>(
    defaultValues?.id
  );

  const [saveZettelNote] = useMutation<ZettelNoteEditorSaveZettelNoteMutation>(
    zettelNoteEditorSaveZettelNoteMutation
  );

  const handleSubmit = async (data: ZettelNoteFormValues) => {
    const oldId = data.id;

    const newId = await new Promise<string | undefined>((resolve, reject) => {
      saveZettelNote({
        variables: {
          note: { ...data, tags: data.tags?.split(', ') },
        },
        onCompleted: ({ zettel }) => {
          return resolve(zettel?.saveNote.id);
        },
        onError: reject,
      });
    });

    setNoteId(newId);

    /**
     * This happens when note's title has changed and a new note was created.
     */
    if (oldId && newId && oldId !== newId) {
      navigate(`/zettel/editor/${newId}`);
    }
  };

  const [title, content] = watch(['title', 'content']);

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
      <FormFieldInput name="title" label="Title" />
      <FormFieldInput name="group" label="Group" disabled />
      <FormFieldInput name="description" label="Description" />
      <FormFieldInput name="tags" label="Tags (separated by comma)" />
      <FormField
        name="content"
        label="Content"
        render={({ field: { onChange, value } }) => {
          return (
            <Editor key={noteId} initialValue={value} onChange={onChange} />
          );
        }}
      />
      <Flex sx={{ gap: 'md' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving' : 'Save'}
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (noteId) {
              navigate(`/zettel/note/${noteId}`);
            } else {
              navigate(`/zettel`);
            }
          }}
        >
          Cancel
        </Button>
      </Flex>
      <ZettelInsights title={title} content={content} />
    </Form>
  );
};

const ZettelNoteFragmentHandler = ({
  zettelNoteRef,
}: {
  zettelNoteRef: ZettelNoteEditor_zettelNote$key;
}) => {
  const note = useFragment(zettelNoteFragment, zettelNoteRef);

  const defaultValues = {
    id: note.id,
    title: note.title,
    group: note.group,
    tags: note.tags?.join(', '),
    description: note.description ?? '',
    content: note.content ?? '',
  };

  return <ZettelNoteForm defaultValues={defaultValues} />;
};

const PreloadedQueryHandler = ({
  zettelNoteEditorRootQueryRef,
}: {
  zettelNoteEditorRootQueryRef: PreloadedQuery<zettelNoteEditorLoaderRootQuery>;
}) => {
  const { zettel } = usePreloadedQuery<zettelNoteEditorLoaderRootQuery>(
    zettelNoteEditorRootQuery,
    zettelNoteEditorRootQueryRef
  );

  const zettelNote = zettel?.note;

  if (!zettelNote) {
    return null;
  }

  return <ZettelNoteFragmentHandler zettelNoteRef={zettelNote} />;
};

/**
 * Check if note exists and load it if it does.
 * Otherwise, render a form to create a new note.
 */
const ZettelNoteEditor = () => {
  const { zettelNoteEditorRootQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelNoteEditorLoader>
  >;

  if (!zettelNoteEditorRootQueryRef) {
    return <ZettelNoteForm />;
  }

  return (
    <PreloadedQueryHandler
      zettelNoteEditorRootQueryRef={zettelNoteEditorRootQueryRef}
    />
  );
};

export default ZettelNoteEditor;
