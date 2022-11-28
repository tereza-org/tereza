import { Theme } from 'theme-ui';

/**
 * Generated on https://color.adobe.com/create/image using the hero image.
 */
const lightPalette = {
  color1: '#011F26',
  color2: '#195959',
  color3: '#5ABFA3',
  color4: '#79F2D0',
  color5: '#BFA18F',
};

const darkPalette = {
  color1: '#160B26',
  color2: '#02000D',
  color3: '#011F26',
  color4: '#195959',
  color5: '#2B8C7B',
};

export const theme: Theme = {
  colors: {
    black: '#160B26',
    white: '#F2F2F2',
    text: '#02000D',
    primary: lightPalette.color3,
    secondary: lightPalette.color1,
  },
  text: {
    h1: {
      fontFamily: 'heading',
      fontSize: ['5rem', '7rem', '9rem'],
      fontWeight: 'bold',
      letterSpacing: 'normal',
    },
  },
};
