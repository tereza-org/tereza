import { Box, Button, Flex, Text } from 'theme-ui';
import { useThemeUI } from 'theme-ui';

export default {
  title: 'Design System/Colors',
};

export const Colors = () => {
  const { theme, setColorMode } = useThemeUI();

  return (
    <Flex sx={{ flexDirection: 'column', gap: 4 }}>
      <Flex>
        {Object.entries(theme.rawColors?.modes || {}).map(([mode, values]) => {
          return (
            <Button
              key={mode}
              sx={{ bg: values.background, color: values.text }}
              onClick={() => {
                return setColorMode?.(mode);
              }}
            >
              {mode}
            </Button>
          );
        })}
      </Flex>
      <Flex sx={{ gap: 4, flexWrap: 'wrap' }}>
        {Object.entries(theme.colors || {}).map(([name, color]) => {
          return (
            <Flex
              key={name}
              sx={{ flexDirection: 'column', alignItems: 'center' }}
            >
              <Box
                key={name}
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: color,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
              />
              <Text>{name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
