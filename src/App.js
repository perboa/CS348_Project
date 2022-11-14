import React, { useEffect, useState } from 'react';
import "./index.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
  } from "react-router-dom";
import LoginForm from './login';
import Form from './Form';
import Logout from './Logout';
//import { Table } from '@mantine/core';

document.body.style.backgroundColor = "#D7E5F0"

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    console.log(setLoggedIn)
    useEffect(()=>{console.log(loggedIn)},[loggedIn])
    return (
         loggedIn ? 
         <>
         
         <Router>
            <Routes>
            <Route exact path='/search' element={
                <>
                    <Logout setLoggedIn={setLoggedIn}/>
                    <Form/>
                </>

            }>
            </Route>
               
            </Routes>
        </Router>
         </>
         
      : <Router>
        <Routes>
            <Route path="*" element={<LoginForm setLoggedIn={setLoggedIn}/>} />
        </Routes>
      
      </Router>
    );
}

export default App;