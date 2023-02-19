import { Editor, EditorProps } from '@tereza-tech/components/src';
import { Story } from '@storybook/react';

export default {
  title: 'components/Editor',
  component: Editor,
};

const Template: Story<EditorProps> = (props) => {
  return <Editor {...props} />;
};

export const Empty = Template.bind({});

const initialValue = `
#### The quarterly results look great!

 - Revenue was off the chart.
 - Profits were higher than ever.

*Everything* is going according to **plan**.
`;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  editable: false,
};
