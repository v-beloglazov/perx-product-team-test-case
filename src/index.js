import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import './index.css';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default
    store.replaceReducer(newRootReducer)
  })
}

const render = (initialData = {}) => {
  const App = require('./App').default;

  const { dealers } = initialData;
  return ReactDOM.render(
    <Provider store={store}>
      <App initialDealers={dealers} />
    </Provider>,
    document.getElementById('root')
  );
};

const initApp = initialData => render(initialData);

window.initReactApp = initApp;

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
