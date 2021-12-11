import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import './styles/index.scss';
//Dev tools
import { composeWithDevTools } from "redux-devtools-extension";


ReactDOM.render(
  <React.StrictMode>
    <App />
    </React.StrictMode>,
  document.getElementById('root')
);