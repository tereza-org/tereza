import { Markdown, MarkdownProps } from '@tereza-tech/components/src';
import { Story } from '@storybook/react';

export default {
  title: 'components/Markdown',
  component: Markdown,
};

// eslint-disable-next-line react/prop-types
const Template: Story<MarkdownProps> = ({ children }) => {
  return <Markdown>{children}</Markdown>;
};

export const Example = Template.bind({});

const markdownExample = `
# The quarterly results look great!

- Revenue was off the chart.
- Profits were higher than ever.

## Sales are soaring!

1. We sold more than we ever thought possible.
2. Revenue exceeds forecasts by 20%.
`.trim();

Example.args = {
  children: markdownExample,
};

export const Elements = Template.bind({});

const markdownElements = `
# This is an h1
## This is an h2
### This is an h3
#### This is an h4
##### This is an h5
###### This is an h6

This is a paragraph.

This is another paragraph.

This is a [link](https://www.google.com).

This is a **bold** text.

This is an *italic* text.

This is a ~~strikethrough~~ text.

This is a \`code\` text.

This is a \`code\` text with a **bold** text.

- This is a list item.
- This is another list item.

1. This is a list item.
2. This is another list item.

> This is a blockquote.

---

This is a horizontal rule.

`.trim();

Elements.args = {
  children: markdownElements,
};
