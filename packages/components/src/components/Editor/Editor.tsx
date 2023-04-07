import * as React from 'react';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { Box, Flex } from '@ttoss/ui';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { CodeHighlightPlugin } from './CodeHighlightPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { EditorRef, EditorRefPlugin } from './EditorRefPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HorizontalRulePlugin } from './HorizontalRulePlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChange, OnChangeMarkdownPlugin } from './OnChangeMarkdownPlugin';
import { Placeholder } from './Placeholder';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { SavePlugin, SaveProvider, SaveProviderProps } from './SavePlugin';
import { TRANSFORMERS } from './MarkdownTransformers';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ToolbarPlugin } from './ToolbarPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

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
    HorizontalRuleNode,
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
} & SaveProviderProps;

export const Editor = React.forwardRef<EditorRef, EditorProps>(
  ({ initialValue, onChange, onSave, autoSaveConfig }, ref) => {
    const shouldRenderOnChangeMarkdownPlugin = Boolean(
      onChange || autoSaveConfig?.enabled
    );

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
        <SaveProvider onSave={onSave} autoSaveConfig={autoSaveConfig}>
          <EditorContainer>
            <ToolbarPlugin />
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    data-testid="editor-input"
                    className="editor-input"
                  />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <CodeHighlightPlugin />
              {shouldRenderOnChangeMarkdownPlugin && (
                <OnChangeMarkdownPlugin onChange={onChange} />
              )}
              <EditorRefPlugin ref={ref} />
              <SavePlugin />
              <HorizontalRulePlugin />
              <HistoryPlugin />
            </Box>
          </EditorContainer>
        </SaveProvider>
      </LexicalComposer>
    );
  }
);

Editor.displayName = 'Editor';
