import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// Don't use relative path '../node_modules/'
  // Webpack assumes when no relative path, file's in node_modules folder
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';


// create a Redux Store (like a data storage)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// hook up the Redux Store to our react app using the Provider tag
// Provider is a react component that reads changes from redux store
  // whenever store gets new state produced inside of it, Provider tells
  // all children components (App and all its children) there's a state change.
  // Provider will update all children components with the new state.
ReactDOM.render(
  <Provider store={store}><App /></Provider>
  , document.querySelector("#root"));
