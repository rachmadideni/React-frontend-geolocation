import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from './utils/history';
import configureStore from './configureStore';
import App from './containers/App';
import { CssBaseline } from '@material-ui/core'; // apply normalization style
import { theme } from './styles/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const initialState = {}
const store = configureStore(initialState,history);

function AppIndex() {
  return (
  		<React.Fragment>
  			<CssBaseline />
	  		<Provider store={store}>
	  			<ConnectedRouter history={history}>
	  				<MuiThemeProvider theme={theme}>
		  				<App />
		  			</MuiThemeProvider>
		    	</ConnectedRouter>
	    	</Provider>
    	</React.Fragment>
  );
}

export default AppIndex;
