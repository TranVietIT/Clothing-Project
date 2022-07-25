import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import Home from './Compornent/Home';
import BlogList from './Compornent/Blog/BlogList';
import BlogDetail from './Compornent/Blog/BlogDetail';
import Comment from './Compornent/Blog/Comment';
import Loginer from './Compornent/Member/Loginer';
import Account from './Compornent/Member/Account';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Home />}/>

          <Route path='/loginer' element={<Loginer />}/>

          <Route path='/blog/list' element={<BlogList />} />

          <Route path='/blog/detail/:id' element={<BlogDetail />} />

          <Route path='/comment' element={<Comment />}/>

          <Route path='/account' element={<Account />}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
