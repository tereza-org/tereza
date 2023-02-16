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
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ToolbarPlugin } from './ToolbarPlugin';

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
          // overflow: 'hidden',
          // position: 'absolute',
          // top: '15px',
          // left: '15px',
          userSelect: 'none',
          pointerEvents: 'none',
        },

        '.editor-input': {
          border: '1px solid red',
        },

        '.editor-paragraph': {
          // backgroundColor: 'red',
          margin: 0,
          position: 'relative',
        },
      }}
    >
      {children}
    </Flex>
  );
};

const Placeholder = () => {
  return (
    <div className="editor-placeholder">
      Play around with the horizontal rule plugin...
    </div>
  );
};

export const Editor = ({
  initialValue,
  onChange,
}: {
  initialValue?: string;
  onChange?: OnChange;
}) => {
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
        <Box>
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
      </EditorContainer>
    </LexicalComposer>
  );
};
