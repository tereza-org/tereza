import { Journal, JournalProps } from '@tereza-tech/components/src';
import { Story } from '@storybook/react';

export default {
  title: 'components/Journal',
  component: Journal,
};

const Template: Story<JournalProps> = (props) => {
  return <Journal {...props} />;
};

const text = `
# What's 1 insight I've had today?

- Today I learned that I can use the \`<kbd>\` tag to display keyboard keys.
- I don't know if the sentence above is because it was generated by Copilot.

# What's 1 thing I'm grateful for today?

- I'm grateful for the fact that I can use Copilot to generate text for my journal entries.

# What's 1 thing I'm proud of today?

- I'm proud of the fact that I can use Copilot to generate text for my journal entries.
`.trim();

export const Example = Template.bind({});
Example.args = {
  label: 'Journal 2023-02-21',
  text,
};
