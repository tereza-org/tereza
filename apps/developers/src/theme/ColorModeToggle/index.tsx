import * as React from 'react';
import { useTheme } from '@ttoss/ui';
import ColorModeToggle from '@theme-original/ColorModeToggle';

const ColorModeToggleWrapper = (props: any) => {
  const { value: colorMode } = props;

  const { setColorMode } = useTheme();

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
