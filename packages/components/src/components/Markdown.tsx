import { BaseStyles } from '@ttoss/ui';
import ReactMarkdown from 'react-markdown';

export type MarkdownProps = {
  children: string;
};

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <BaseStyles>
      <ReactMarkdown>{children}</ReactMarkdown>
    </BaseStyles>
  );
};
