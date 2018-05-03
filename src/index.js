import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/pages/home';
import Cart from './components/pages/cart';
import Stat from './components/pages/stat';
import StatMap from './components/pages/statkor';

import University from './components/pages/university';
import registerServiceWorker from './registerServiceWorker';

//REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
//REACT-REDUX
import logger from 'redux-logger'; //logs all beautifully in dev mode
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// COOKIE
import { CookiesProvider } from 'react-cookie';

// API URL comment out the one you don't use
export const API_URL = 'https://gib2-api.herokuapp.com';
// const API_URL = 'http://localhost:8080';

//STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
  <CookiesProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/about us" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/universitet" component={University} />
        <Route path="/kor" component={StatMap} />

        <Route path="/stat" component={Stat} />

      </Route>
    </Router>
    </CookiesProvider>
  </Provider>

)


ReactDOM.render(
  Routes, document.getElementById('root')
);
registerServiceWorker();

export default API_URL;
