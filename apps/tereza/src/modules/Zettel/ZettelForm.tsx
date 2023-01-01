import { ActionFunctionArgs, redirect, useSubmit } from 'react-router-dom';
import { Button } from '@ttoss/ui';
import { Form, FormFieldInput, useForm, yup, yupResolver } from '@ttoss/forms';

export const zettelFormAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = JSON.parse(formData.get('serialized') as string);
  // eslint-disable-next-line no-console
  console.log(data);
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
