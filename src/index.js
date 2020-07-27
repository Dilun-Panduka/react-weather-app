import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import LoginComponent from './components/LoginComponent'
import PostItems from './components/PostItems';

const history = createBrowserHistory();
ReactDOM.render(
  
  <React.StrictMode>
    {/* <App /> */}
    <Router history = {history}>
      <Route path="/" exact component={LoginComponent}></Route>
      {localStorage.getItem("userInfo")?
        <Route path="/home" component={PostItems}></Route>
      : null}
      
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
