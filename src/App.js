import logo from './logo.svg';
import './App.css';
import { MantineProvider } from '@mantine/core';
import {useState, useEffect} from 'react'
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
 
// TODO: upddate this to show home page, ideally search bar and sign-up button 
// are components in seperate files and displayed either here or brought in as a seperate home page

function App() {
  const [colleges, setColleges] = useState([]);
  
  useEffect(() => {
    fetch('/api/test', {
        'method':'GET',
        'headers': {
            'Content-Type': 'applications/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        setColleges(data.Hello);
    })
    .catch(error => console.log(error))
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
                <p> This should say World: {colleges} </p>
            </header>
        </div>
    </MantineProvider>
  );
}

export default App;
