import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5533',
      main: '#e60000',
      dark: '#ab0000',
      contrastText: '#000',
    },
  },
});
