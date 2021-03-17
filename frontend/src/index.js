import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.scss'
import App from './App'
import store from './store'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';


LogRocket.init('3fwedi/faton');

setupLogRocketReact(LogRocket);

LogRocket.identify('10001d', {
  name: 'Issaka Faisal',
  email: 'faisallarai@yahoo.com',

  // Add your own custom user variables here, ie:
  subscriptionType: 'pro'
});

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
