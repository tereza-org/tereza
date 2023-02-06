import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
import { Form, FormFieldInput, useForm, yup, yupResolver } from '@ttoss/forms';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import {
  PreloadedQuery,
  graphql,
  loadQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { ZettelNoteEditorLoaderQuery } from './__generated__/ZettelNoteEditorLoaderQuery.graphql';
import { ZettelNoteEditorSaveZettelNoteMutation } from './__generated__/ZettelNoteEditorSaveZettelNoteMutation.graphql';
import { ZettelNoteEditor_zettelNote$key } from './__generated__/ZettelNoteEditor_zettelNote.graphql';
import { relayEnvironment } from '../ApiClient/relayEnvironment';

const zettelNoteFragment = graphql`
  fragment ZettelNoteEditor_zettelNote on ZettelNote {
    id
    title
    description
    content
  }
`;

const zettelNoteEditorLoaderQuery = graphql`
  query ZettelNoteEditorLoaderQuery($noteId: ID!) {
    zettel {
      note: getNote(id: $noteId) {
        ...ZettelNoteEditor_zettelNote
      }
    }
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

export const zettelNoteEditorLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { noteId } = params;

  if (!noteId) {
    return {};
  }

  const zettelNoteEditorLoaderQueryRef = loadQuery<ZettelNoteEditorLoaderQuery>(
    relayEnvironment,
    zettelNoteEditorLoaderQuery,
    { noteId }
  );

  return { zettelNoteEditorLoaderQueryRef };
};

const schema = yup.object({
  id: yup.string(),
  title: yup.string().required(),
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
    defaultValues,
  });

  const { isSubmitting } = formMethods.formState;

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
          note: { ...data },
        },
        onCompleted: ({ zettel }) => {
          return resolve(zettel?.saveNote.id);
        },
        onError: reject,
      });
    });

    setNoteId(newId);

    /**
     * This happens when note's title has changed and a new note is created.
     */
    if (oldId && newId && oldId !== newId) {
      navigate(`/zettel/editor/${newId}`);
    }
  };

  return (
    <Form {...formMethods} onSubmit={handleSubmit}>
      <FormFieldInput name="title" label="Title" />
      <FormFieldInput name="description" label="Description" />
      <FormFieldInput name="content" label="Content" />
      <Flex sx={{ gap: 3 }}>
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
    </Form>
  );
};

const ZettelNoteFragmentHandler = ({
  noteRef,
}: {
  noteRef: ZettelNoteEditor_zettelNote$key;
}) => {
  const note = useFragment(zettelNoteFragment, noteRef);

  const defaultValues = {
    id: note.id,
    title: note.title,
    description: note.description ?? '',
    content: note.content ?? '',
  };

  return <ZettelNoteForm defaultValues={defaultValues} />;
};

const PreloadedQueryHandler = ({
  zettelNoteEditorLoaderQueryRef,
}: {
  zettelNoteEditorLoaderQueryRef: PreloadedQuery<ZettelNoteEditorLoaderQuery>;
}) => {
  const { zettel } = usePreloadedQuery<ZettelNoteEditorLoaderQuery>(
    zettelNoteEditorLoaderQuery,
    zettelNoteEditorLoaderQueryRef
  );

  const noteRef = zettel?.note;

  if (!noteRef) {
    return null;
  }

  return <ZettelNoteFragmentHandler noteRef={noteRef} />;
};

export const ZettelNoteEditor = () => {
  const { zettelNoteEditorLoaderQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelNoteEditorLoader>
  >;

  if (!zettelNoteEditorLoaderQueryRef) {
    return <ZettelNoteForm />;
  }

  return (
    <PreloadedQueryHandler
      zettelNoteEditorLoaderQueryRef={zettelNoteEditorLoaderQueryRef}
    />
  );
};
