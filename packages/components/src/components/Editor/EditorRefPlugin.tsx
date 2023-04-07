import * as React from 'react';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS } from './MarkdownTransformers';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export type EditorRef = {
  updateValue: (value: string) => void;
};

export const EditorRefPlugin = React.forwardRef<EditorRef>((_, ref) => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!ref) {
      return;
    }

    if ('current' in ref) {
      ref.current = {
        updateValue: (value: string) => {
          editor.update(() => {
            return $convertFromMarkdownString(value, TRANSFORMERS);
          });
        },
      };
    }
  }, [editor, ref]);

  return null;
});

EditorRefPlugin.displayName = 'EditorRefPlugin';
