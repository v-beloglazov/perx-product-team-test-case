import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import './index.css';

import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(throttle(() => {
  saveState({
    cart: store.getState().cart,
  });
}, 1000));

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

const render = initialData => {
  const App = require('./App').default;

  const storedInitialData = JSON.parse(localStorage.getItem('initialData'));

  let dealers;

  if (initialData) {
    dealers = initialData.dealers;
  } else if (storedInitialData) {
    dealers = storedInitialData.dealers;
  }

  return ReactDOM.render(
    <Provider store={store}>
      <App initialDealers={dealers} />
    </Provider>,
    document.getElementById('root')
  );
};

if (localStorage.getItem('appState') === 'inited') {
  render();
}

const initApp = initialData => {
  localStorage.setItem('appState', 'inited');
  localStorage.setItem('initialData', JSON.stringify(initialData));
  return render(initialData);
};

window.initReactApp = initApp;

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
