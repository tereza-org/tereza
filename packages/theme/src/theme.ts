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

// const darkPalette = {
//   color1: '#160B26',
//   color2: '#02000D',
//   color3: '#011F26',
//   color4: '#195959',
//   color5: '#2B8C7B',
// };

// text: {
//   h1: {
//     fontFamily: 'heading',
//     fontSize: ['5rem', '7rem', '9rem'],
//     fontWeight: 'bold',
//     letterSpacing: 'normal',
//   },
// },

const white = '#FDFDFD';

const black = '#0D0D0D';

export const theme: Theme = {
  initialColorModeName: 'light',
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    heading: 'Lato',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96, 128],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.125,
  },
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
  shadows: {
    none: 'none',
    shadow: `0 0 10px ${lightPalette.color1}, 0 0 16px ${lightPalette.color1}`,
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      a: {
        color: 'secondary',
        textDecoration: 'none',
        ':hover': {
          color: 'primary',
          textDecoration: 'underline',
        },
      },
    },
    h1: {
      variant: 'text.heading',
      fontSize: 6,
      marginTop: 0,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 5,
      marginY: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 4,
      marginY: 4,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 1,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
};
