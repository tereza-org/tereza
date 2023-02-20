import { Editor, EditorProps } from '@tereza-tech/components/src';
import { Story } from '@storybook/react';

export default {
  title: 'components/Editor',
  component: Editor,
};

const Template: Story<EditorProps> = (props) => {
  return <Editor {...props} />;
};

const initialValue = `
# The quarterly results look great!

- Revenue was off the chart.
- Profits were higher than ever.
`;

export const Empty = Template.bind({});

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue,
};
