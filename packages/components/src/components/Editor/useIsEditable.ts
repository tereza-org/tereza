import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const useIsEditable = ({ editable }: { editable?: boolean } = {}) => {
  const [editor] = useLexicalComposerContext();

  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsEditable(editor.isEditable());
    });
  }, [editor]);

  React.useEffect(() => {
    const removeEditableListener = editor.registerEditableListener(
      (isEditable) => {
        setIsEditable(isEditable);
      }
    );

    return () => {
      removeEditableListener();
    };
  }, [editor]);

  return { isEditable };
};
