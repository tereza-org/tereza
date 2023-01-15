import { Editor } from '@tereza-tech/components';
import { Story } from '@storybook/react';

export default {
  title: 'components/Editor',
  component: Editor,
};

const Template: Story<any> = () => {
  return <Editor />;
};

export const Example = Template.bind({});
