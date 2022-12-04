import { useThemeUI } from 'theme-ui';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import React from 'react';

const ColorModeToggleWrapper = (props: any) => {
  const { value: colorMode } = props;

  const { setColorMode } = useThemeUI();

  React.useEffect(() => {
    setColorMode?.(colorMode);
  }, [colorMode, setColorMode]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
};

export default ColorModeToggleWrapper;
