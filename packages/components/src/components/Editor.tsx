import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import ExampleTheme from './themes/ExampleTheme';
// import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
// import ToolbarPlugin from './plugins/PluginToolbar';

const editorConfig = {
  namespace: 'editor',
  theme: {},
  onError: (error: Error) => {
    throw error;
  },
  nodes: [HorizontalRuleNode],
};

const Placeholder = () => {
  return (
    <div className="editor-placeholder">
      Play around with the horizontal rule plugin...
    </div>
  );
};

export const Editor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={() => {
            return <div />;
          }}
        />
      </div>
    </LexicalComposer>
  );
};
