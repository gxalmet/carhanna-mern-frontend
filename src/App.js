import React from 'react';

import './App.css';
import MainNav from './components/MainNav';
import Router from './components/Router';

import { Container } from 'react-bootstrap';
import { 
  BrowserRouter, 
//  Redirect 
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Container fluid>
      <MainNav></MainNav> 
      <Container fluid>
        <Router></Router>
      </Container>
      
      {/* <Container fluid>
        <div className="footer">All right reserved 2020.</div>
      </Container> */}
      

    </Container>
  </BrowserRouter>
  );
}

export default App;
