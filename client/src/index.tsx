import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
//redux persist : state 유지
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


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

const persistConfig = {
    key: 'root',
    storage
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(enhancedReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>, 
    document.getElementById('app')
);