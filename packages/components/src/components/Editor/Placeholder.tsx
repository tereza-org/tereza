import { Text } from '@ttoss/ui';
import { useIsEditable } from './useIsEditable';

export const Placeholder = () => {
  const { isEditable } = useIsEditable();

  if (!isEditable) {
    return null;
  }

  return <Text className="editor-placeholder">Type something here.</Text>;
};
