import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { AUTOSAVE_COMMAND } from './SavePlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useDebouncedCallback } from 'use-debounce';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { Dispatch, SetStateAction } from 'react';
import type { EditorState } from 'lexical';

export type OnChange =
  | Dispatch<SetStateAction<string>>
  | ((value: string) => void);

const transformState = (editorState: EditorState) => {
  return editorState.read(() => {
    const markdown = $convertToMarkdownString(TRANSFORMERS);

    const escaped = markdown
      /**
       * https://github.com/markedjs/marked/issues/190#issuecomment-865303317
       */
      // .replace(/\n(?=\n)/g, '\n\n<br>\n')
      /**
       * When escape(markdown) with block quotes we end up with the following:
       * '&gt; block quote text'
       * and need to convert it back to the original, so the markdown is respected
       */
      .replace(/^(&gt;)(?=\s)(?!.*&lt;)/gm, '>');

    return escaped;
  });
};

export const OnChangeMarkdownPlugin = ({
  onChange,
}: {
  onChange?: OnChange;
}) => {
  const [editor] = useLexicalComposerContext();

  const debouncedOnChange = useDebouncedCallback((editorState: EditorState) => {
    const escaped = transformState(editorState);

    onChange?.(escaped);

    editor.dispatchCommand(AUTOSAVE_COMMAND, escaped);
  }, 1);

  return <OnChangePlugin onChange={debouncedOnChange} ignoreSelectionChange />;
};
