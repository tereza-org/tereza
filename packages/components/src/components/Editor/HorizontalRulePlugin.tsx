import * as React from 'react';
import {
  $createHorizontalRuleNode,
  INSERT_HORIZONTAL_RULE_COMMAND,
} from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const HorizontalRulePlugin = () => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerTextContentListener((textContent) => {
      if (textContent.includes('\n---') || textContent === '---') {
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
      }
    });
  }, [editor]);

  React.useEffect(() => {
    return editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      () => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          return false;
        }

        const focusNode = selection.focus.getNode();

        if (!focusNode) {
          return true;
        }

        if (focusNode.getTextContent() === '---') {
          const horizontalRuleNode = $createHorizontalRuleNode();

          selection.insertParagraph();
          focusNode.replace(horizontalRuleNode);
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};
