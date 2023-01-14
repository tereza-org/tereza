import { ActionFunctionArgs, redirect, useSubmit } from 'react-router-dom';
import { Button } from '@ttoss/ui';
import { Form, FormFieldInput, useForm, yup, yupResolver } from '@ttoss/forms';
import { ZettelFormMutation } from './__generated__/ZettelFormMutation.graphql';
import { commitMutation, graphql } from 'react-relay';
import { relayEnvironment } from '../Relay/environment';

export const zettelFormAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const data = JSON.parse(formData.get('serialized') as string);

  await new Promise((resolve, reject) => {
    commitMutation<ZettelFormMutation>(relayEnvironment, {
      mutation: graphql`
        mutation ZettelFormMutation($zettel: ZettelInput!) {
          zettel {
            create(zettel: $zettel) {
              id
              title
            }
          }
        }
      `,
      onCompleted: resolve,
      onError: reject,
      variables: {
        zettel: {
          title: data.title,
        },
      },
    });
  });

  return redirect('/zettel');
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;

export const ZettelForm = () => {
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submit = useSubmit();

  /**
   * https://github.com/remix-run/react-router/issues/9367
   */
  const handleSubmit = (data: FormValues) => {
    submit(
      {
        serialized: JSON.stringify(data),
      },
      { method: 'post' }
    );
  };

  return (
    <Form {...formMethods} onSubmit={handleSubmit}>
      <FormFieldInput name="title" label="Title" />
      <FormFieldInput name="description" label="Description" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
