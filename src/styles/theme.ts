import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  styles: {
    global: {
      '#__next': {
        height: '100%'
      },
      html: {
        height: '100%'
      },
      body: {
        height: '100%',
        backgroundColor: 'white',
        color: 'gray.900'
      }
    }
  }
});
