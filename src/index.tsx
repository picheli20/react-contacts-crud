import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './app/containers/Home';
import { IStoreState } from './app/types';
import { userInfo } from './app/reducers';

import './index.scss';

const store = createStore<IStoreState>(userInfo, {
  userInfo: {},
  loginInfo: {
    isLogged: false,
  }
});

// to auth, add this header: Authorization          Basic btoa(username:password)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path='/' component={Home}/>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);
