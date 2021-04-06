import React from 'react';

import './App.css';
import MainNav from './components/MainNav';
import Router from './components/Router';

import { 
  BrowserRouter, 
} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <MainNav></MainNav> 
      <Router></Router>
      {/* <div class="footer">All right reserved 2020.</div> */}
    </BrowserRouter>
  );
}

export default App;
