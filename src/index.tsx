import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Home } from './app/components/Home/Home';
import { IStoreState } from './app/types';
import { enthusiasm } from './app/reducers';

import './index.scss';

const store = createStore<IStoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
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
