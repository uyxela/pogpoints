import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: `"Red Hat Text"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: '#FFF',
    },
    secondary: {
      main: '#232340',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#E5E5E5',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        borderColor: '#FFF',
        color: '#fff',
      },
      root: {
        borderColor: '#FFF',
        color: '#FFF',
        backgroundColor: '#fff',
        marginTop: '5%',
        marginBottom: '5%',
        width: '100%',
        marginLeft: '-3%',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#fff',
      },
    },
    MuiButton: {
      root: {
        backgroundColor: '#9cdbff',
        color: 'black',
      },
    },

  },
});

export default theme;
