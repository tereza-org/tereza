import { $createHorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $isHorizontalRuleNode,
  HorizontalRuleNode,
} from '@lexical/react/LexicalHorizontalRuleNode';
import {
  ElementTransformer,
  TRANSFORMERS as LEXICAL_TRANSFORMERS,
} from '@lexical/markdown';

export const HORIZONTAL_RULE: ElementTransformer = {
  dependencies: [HorizontalRuleNode],
  export: (node) => {
    if (!$isHorizontalRuleNode(node)) {
      return null;
    }
    return '---';
  },
  regExp: /---/,
  replace: (parentNode) => {
    const node = $createHorizontalRuleNode();
    parentNode.replace(node);
  },
  type: 'element',
};

export const TRANSFORMERS = [...LEXICAL_TRANSFORMERS, HORIZONTAL_RULE];
