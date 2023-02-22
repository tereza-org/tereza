import * as React from 'react';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { Box, Flex } from '@ttoss/ui';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { CodeHighlightPlugin } from './CodeHighlightPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorRef, EditorRefPlugin } from './EditorRefPlugin';
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
import { ToolbarPlugin } from './ToolbarPlugin';
import { forwardRef } from 'react';

export type { OnChange, EditorRef };

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
        backgroundColor: '#fbfbfb',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: '#ccc',

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
          borderTop: '1px solid',
          borderColor: '#ccc',
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
  initialValue?: string;
  onChange?: OnChange;
};

export const Editor = forwardRef<any, EditorProps>(
  ({ initialValue, onChange }, ref) => {
    return (
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
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
            <EditorRefPlugin ref={ref} />
          </Box>
        </EditorContainer>
      </LexicalComposer>
    );
  }
);

Editor.displayName = 'Editor';
