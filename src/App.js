import React, { useState } from 'react';
import "./index.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import LoginForm from './login';
import SiteHeader from './header';
import Search from './search';
import SignUp from './signup';
import College from './college';
//import { Table } from '@mantine/core';

document.body.style.backgroundColor = "#FFFFFF"

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [id, setid] = useState(0)
    return (
         loggedIn ? 
         <>
          <Router>
            <SiteHeader loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <Routes>
            <Route 
                exact path='*' 
                element={
                  <>
                    <Search/>
                  </>
                }>
            </Route>
            <Route 
                exact path='/search' 
                element={
                  <>
                    <Search/>
                  </>
                }>
            </Route>
            <Route 
              path='/college/:id' 
              element={
                <>
                  <College/>
                </>
              }>
            </Route>
            </Routes>
          </Router>
         </>
        : <Router>
          <SiteHeader loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Routes>
          <Route 
                exact path='*' 
                element={
                  <>
                    <Search/>
                  </>
                }>
          </Route>
          <Route 
                exact path='/search' 
                element={
                  <>
                    <Search setLoggedIn={setLoggedIn}/>
                  </>
                }>
          </Route>
          <Route 
                path='/college/:id'  
                element={
                  <>
                    <College/>
                  </>
                }>
          </Route>
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/login" element={<LoginForm setLoggedIn={setLoggedIn} setid={setid}/>} />
          </Routes>
        </Router>

    );
}

export default App;