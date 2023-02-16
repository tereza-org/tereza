import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useDebouncedCallback } from 'use-debounce';
import type { Dispatch, SetStateAction } from 'react';
import type { EditorState } from 'lexical';

export type OnChange =
  | Dispatch<SetStateAction<string>>
  | ((value: string) => void);

const transformState = (editorState: EditorState, onChange: OnChange) => {
  editorState.read(() => {
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

    onChange(escaped);
  });
};

export const OnChangeMarkdownPlugin = ({
  onChange,
}: {
  onChange: OnChange;
}) => {
  const debouncedOnChange = useDebouncedCallback((editorState: EditorState) => {
    return transformState(editorState, onChange);
  }, 250);

  return <OnChangePlugin onChange={debouncedOnChange} ignoreSelectionChange />;
};
