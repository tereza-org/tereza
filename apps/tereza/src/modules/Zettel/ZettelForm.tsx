import { Button } from '@ttoss/ui';
import { Form, FormFieldInput, useForm, yup, yupResolver } from '@ttoss/forms';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import {
  PreloadedQuery,
  graphql,
  loadQuery,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from 'react-relay';
import { ZettelFormLoaderQuery } from './__generated__/ZettelFormLoaderQuery.graphql';
import { ZettelFormSaveZettelNoteMutation } from './__generated__/ZettelFormSaveZettelNoteMutation.graphql';
import { ZettelForm_zettelNote$key } from './__generated__/ZettelForm_zettelNote.graphql';
import { relayEnvironment } from '../ApiClient/relayEnvironment';

const zettelNoteFragment = graphql`
  fragment ZettelForm_zettelNote on ZettelNote {
    title
    description
    content
  }
`;

const zettelFormLoaderQuery = graphql`
  query ZettelFormLoaderQuery($noteId: ID!) {
    zettel {
      note: getNote(id: $noteId) {
        ...ZettelForm_zettelNote
      }
    }
  }
`;

const zettelFormSaveZettelNoteMutation = graphql`
  mutation ZettelFormSaveZettelNoteMutation($note: ZettelNoteInput!) {
    zettel {
      saveNote(note: $note) {
        ...ZettelForm_zettelNote
      }
    }
  }
`;

export const zettelFormLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const noteId = url.searchParams.get('noteId');

  if (!noteId) {
    return {};
  }

  const zettelFormLoaderQueryRef = loadQuery<ZettelFormLoaderQuery>(
    relayEnvironment,
    zettelFormLoaderQuery,
    { noteId }
  );

  return { zettelFormLoaderQueryRef };
};

// export const zettelFormAction: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();

//   const note = JSON.parse(formData.get('serialized') as string);

//   await new Promise((resolve, reject) => {
//     commitMutation<ZettelFormSaveZettelNoteMutation>(relayEnvironment, {
//       mutation: zettelFormSaveZettelNoteMutation,
//       onCompleted: resolve,
//       onError: reject,
//       variables: { note },
//     });
//   });

//   return redirect('/zettel');
// };

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  content: yup.string(),
});

type ZettelNoteFormValues = yup.InferType<typeof schema>;

export const ZettelNoteForm = ({
  defaultValues,
}: {
  defaultValues?: Partial<ZettelNoteFormValues>;
}) => {
  const formMethods = useForm<ZettelNoteFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { isSubmitting } = formMethods.formState;

  const [saveZettelNote] = useMutation<ZettelFormSaveZettelNoteMutation>(
    zettelFormSaveZettelNoteMutation
  );

  const handleSubmit = async (data: ZettelNoteFormValues) => {
    return new Promise<void>((resolve, reject) => {
      saveZettelNote({
        variables: {
          note: { ...data },
        },
        onCompleted: () => {
          return resolve();
        },
        onError: reject,
      });
    });
  };

  // // const submit = useSubmit();

  // /**
  //  * https://github.com/remix-run/react-router/issues/9367
  //  */
  // const handleSubmit = async (data: ZettelNoteFormValues) => {
  //   submit(
  //     {
  //       serialized: JSON.stringify(data),
  //     },
  //     { method: 'post' }
  //   );

  //   return new Promise<void>((resolve) => {
  //     setTimeout(() => {
  //       return resolve();
  //     }, 10000);
  //   });
  // };

  return (
    <Form {...formMethods} onSubmit={handleSubmit}>
      <FormFieldInput name="title" label="Title" />
      <FormFieldInput name="description" label="Description" />
      <FormFieldInput name="content" label="Content" />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving' : 'Save'}
      </Button>
    </Form>
  );
};

const ZettelNoteFragmentHandler = ({
  noteRef,
}: {
  noteRef: ZettelForm_zettelNote$key;
}) => {
  const note = useFragment(zettelNoteFragment, noteRef);

  const defaultValues = {
    title: note.title || '',
    description: note.description || '',
    content: note.content || '',
  };

  return <ZettelNoteForm defaultValues={defaultValues} />;
};

const PreloadedQueryHandler = ({
  zettelFormLoaderQueryRef,
}: {
  zettelFormLoaderQueryRef: PreloadedQuery<ZettelFormLoaderQuery>;
}) => {
  const { zettel } = usePreloadedQuery<ZettelFormLoaderQuery>(
    zettelFormLoaderQuery,
    zettelFormLoaderQueryRef
  );

  const noteRef = zettel?.note;

  if (!noteRef) {
    return null;
  }

  return <ZettelNoteFragmentHandler noteRef={noteRef} />;
};

export const ZettelForm = () => {
  const { zettelFormLoaderQueryRef } = useLoaderData() as Awaited<
    ReturnType<typeof zettelFormLoader>
  >;

  if (!zettelFormLoaderQueryRef) {
    return <ZettelNoteForm />;
  }

  return (
    <PreloadedQueryHandler
      zettelFormLoaderQueryRef={zettelFormLoaderQueryRef}
    />
  );
};
