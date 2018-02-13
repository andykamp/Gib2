import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/pages/home';
import Cart from './components/pages/cart';
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

//STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);

const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/about us" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/universitet" component={University} />
      </Route>
    </Router>
  </Provider>

)


ReactDOM.render(
  Routes, document.getElementById('root')
);
registerServiceWorker();
