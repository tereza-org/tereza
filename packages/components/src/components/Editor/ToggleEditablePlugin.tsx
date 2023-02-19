import * as React from 'react';
import { Button, Flex } from '@ttoss/ui';
import { useIsEditable } from './useIsEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const ToggleEditablePlugin = ({ editable }: { editable?: boolean }) => {
  const [editor] = useLexicalComposerContext();

  const { isEditable } = useIsEditable({ editable });

  React.useEffect(() => {
    editor.setEditable(!!editable);
  }, [editable, editor]);

  return (
    <Flex
      sx={{
        justifyContent: 'flex-end',
      }}
    >
      <Button
        onClick={() => {
          return editor.setEditable(!isEditable);
        }}
      >
        {isEditable ? 'Close Editor' : 'Edit'}
      </Button>
    </Flex>
  );
};
