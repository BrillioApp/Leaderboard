import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from 'redux/store/Store';
import App from "containers/app/App"

const routing=(
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(routing,document.getElementById('root'));


