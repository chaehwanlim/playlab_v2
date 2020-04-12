import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

const theme = createMuiTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans KR", "Roboto", serif',
    },
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#FFFFFF',
            light: '#FFFFFF',
            contrastText: '#000000',
        },
    }
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>, 
    document.getElementById('app')
);