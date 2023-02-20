import * as React from 'react';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { Box, Flex } from '@ttoss/ui';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { CodeHighlightPlugin } from './CodeHighlightPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChange, OnChangeMarkdownPlugin } from './OnChangeMarkdownPlugin';
import { Placeholder } from './Placeholder';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ToggleEditablePlugin } from './ToggleEditablePlugin';
import { ToolbarPlugin } from './ToolbarPlugin';

export type { OnChange };

const editorConfig = {
  namespace: 'editor',
  theme: {
    paragraph: 'editor-paragraph',
  },
  onError: (error: Error) => {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        '.ltr': {
          textAlign: 'left',
        },

        '.rtl': {
          textAlign: 'right',
        },

        '.editor-placeholder': {
          color: '#999',
          overflow: 'hidden',
          position: 'absolute',
          top: 'md',
          left: 'md',
          userSelect: 'none',
          pointerEvents: 'none',
        },

        '.editor-input': {
          border: '1px solid black',
          height: '100%',
          minHeight: '100px',
          padding: 'md',
        },

        '.editor-paragraph': {
          margin: 'none',
          marginBottom: 'md',
          position: 'relative',
        },
      }}
    >
      {children}
    </Flex>
  );
};

export type EditorProps = {
  editable?: boolean;
  initialValue?: string;
  onChange?: OnChange;
};

export const Editor = ({
  editable = true,
  initialValue,
  onChange,
}: EditorProps) => {
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editable,
        editorState: () => {
          if (!initialValue) {
            return;
          }

          return $convertFromMarkdownString(initialValue, TRANSFORMERS);
        },
      }}
    >
      <EditorContainer>
        <ToolbarPlugin />
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={() => {
              return <div>Error</div>;
            }}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <CodeHighlightPlugin />
          {onChange && <OnChangeMarkdownPlugin onChange={onChange} />}
        </Box>
        <ToggleEditablePlugin editable={editable} />
      </EditorContainer>
    </LexicalComposer>
  );
};
