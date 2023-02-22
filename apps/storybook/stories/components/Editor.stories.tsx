import * as React from 'react';
import { Button, Flex, Input } from '@ttoss/ui';
import { Editor, EditorProps, EditorRef } from '@tereza-tech/components/src';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'components/Editor',
  component: Editor,
} as Meta;

const Template: Story<EditorProps> = (props) => {
  return <Editor {...props} />;
};

const initialValue = `
# The quarterly results look great!

- Revenue was off the chart.
- Profits were higher than ever.

## Sales are soaring!

1. We sold more than we ever thought possible.
2. Revenue exceeds forecasts by 20%.
`;

export const Empty = Template.bind({});

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue,
};

export const UpdateEditor = () => {
  const editorRef = React.useRef<EditorRef>(null);

  const [value, setValue] = React.useState('');

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 'xl',
      }}
    >
      <Input
        placeholder="Type something here to update the editor..."
        value={value}
        onChange={(e) => {
          return setValue(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          editorRef.current.updateValue(value);
        }}
      >
        Update Editor
      </Button>
      <Editor initialValue={value} onChange={setValue} ref={editorRef} />
    </Flex>
  );
};
