import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const render = initialData => {
  const { dealers } = initialData;
  return ReactDOM.render(
    <App initialDealers={dealers} />,
    document.getElementById('root')
  );
};
const initApp = (initialData = {}) => render(initialData);
window.initReactApp = initApp;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
