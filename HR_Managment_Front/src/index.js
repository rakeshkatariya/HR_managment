import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import '../src/assets/scss/_primeflex.scss';
import '../src/assets/scss/_primereact.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primeicons/primeicons.css"; 
import '../src/assets/scss/Style.scss';
import Router from './Router';

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
