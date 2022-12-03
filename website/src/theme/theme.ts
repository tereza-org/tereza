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

const white = '#FDFDFD';

const black = '#0D0D0D';

export const theme: Theme = {
  initialColorModeName: 'light',
  colors: {
    black,
    white,
    text: black,
    background: white,
    primary: lightPalette.color3,
    secondary: lightPalette.color1,
    modes: {
      dark: {
        text: white,
        background: black,
      },
    },
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
