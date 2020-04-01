import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans KR", "Roboto", serif',
  },
  palette: {
      primary: {
          main: '#000000',
      },
      secondary: {
          main: '#FE6B8B',
          light: '#FE8D8B',
          contrastText: '#017274',
      },
  }
});

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('app'));