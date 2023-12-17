import * as React from 'react';
import { $convertToMarkdownString } from '@lexical/markdown';
import {
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  LexicalCommand,
  createCommand,
} from 'lexical';
import { TRANSFORMERS } from './MarkdownTransformers';
import { useDebouncedCallback } from 'use-debounce';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { EditorState } from 'lexical';

export type AutoSaveConfig = {
  enabled?: boolean;
  delay?: number;
  maxWait?: number;
};

const autoSaveConfigDefault: AutoSaveConfig = {
  enabled: false,
  delay: 5 * 1000,
  maxWait: 30 * 1000,
};

enum SaveState {
  SAVING = 'saving',
  SAVED = 'saved',
  NOT_SAVED = 'not-saved',
}

export type SaveProviderProps = {
  onSave?: (newText: string) => Promise<void>;
  autoSaveConfig?: AutoSaveConfig;
};

const SaveContext = React.createContext<
  {
    saveState: SaveState | null;
    setSaveState: React.Dispatch<React.SetStateAction<SaveState | null>>;
    saveMessage?: string;
    /**
     * autoSaveConfig is NOT optional because of the default value.
     */
    autoSaveConfig: AutoSaveConfig;
  } & SaveProviderProps
>({
  saveState: null,
  setSaveState: () => {
    return;
  },
  autoSaveConfig: autoSaveConfigDefault,
});

export const SAVE_COMMAND: LexicalCommand<undefined> = createCommand();

export const AUTOSAVE_COMMAND: LexicalCommand<string | undefined> =
  createCommand();

const saveMessages: Record<SaveState, string> = {
  [SaveState.SAVING]: 'Saving...',
  [SaveState.SAVED]: 'Saved',
  [SaveState.NOT_SAVED]: 'Not saved',
};

export const SaveProvider = ({
  children,
  onSave,
  autoSaveConfig,
}: React.PropsWithChildren<SaveProviderProps>) => {
  const [saveState, setSaveState] = React.useState<SaveState | null>(null);

  const saveMessage = saveState !== null ? saveMessages[saveState] : '';

  return (
    <SaveContext.Provider
      value={{
        saveState,
        setSaveState,
        onSave,
        autoSaveConfig: {
          ...autoSaveConfigDefault,
          ...autoSaveConfig,
        },
        saveMessage,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export const useSaveContext = () => {
  return React.useContext(SaveContext);
};

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

export const SavePlugin = () => {
  const [editor] = useLexicalComposerContext();

  const { setSaveState, onSave, autoSaveConfig } = useSaveContext();

  const handleSave = React.useCallback(
    (textToBeSaved: string) => {
      if (onSave) {
        setSaveState(SaveState.SAVING);

        /**
         * If the payload is defined, we will use it. This is useful on
         * debounced callback flush. Otherwise, it'll use the current state,
         * that is empty when the component is unmounted.
         */
        onSave(textToBeSaved)
          .then(() => {
            setSaveState(SaveState.SAVED);
          })
          .catch(() => {
            setSaveState(SaveState.NOT_SAVED);
          });
      }
    },
    [onSave, setSaveState]
  );

  React.useEffect(() => {
    return editor.registerCommand(
      SAVE_COMMAND,
      () => {
        const textToBeSaved = transformState(editor.getEditorState());

        handleSave(textToBeSaved);

        return true;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, handleSave]);

  const autoSaveDebouncedCallback = useDebouncedCallback(
    (payload: string) => {
      handleSave(payload);
    },
    autoSaveConfig.delay,
    {
      maxWait: autoSaveConfig.maxWait,
      leading: true,
    }
  );

  /**
   * When the component goes to be unmounted, we will save it.
   */
  React.useEffect(() => {
    return () => {
      autoSaveDebouncedCallback.flush();
    };
  }, [autoSaveDebouncedCallback, setSaveState]);

  React.useEffect(() => {
    return editor.registerCommand(
      AUTOSAVE_COMMAND,
      (payload) => {
        if (autoSaveConfig.enabled) {
          setSaveState(SaveState.NOT_SAVED);

          /**
           * If the payload is defined, we will use it. This is useful on
           * debounced callback flush. Otherwise, it'll use the current state,
           * that is empty when the component is unmounted.
           *
           * Auto save has payload because onChange call it with the
           * on changed text.
           */
          const textToBeSaved =
            payload ?? transformState(editor.getEditorState());

          autoSaveDebouncedCallback(textToBeSaved);
        }

        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor, autoSaveDebouncedCallback, setSaveState, autoSaveConfig.enabled]);

  return null;
};
