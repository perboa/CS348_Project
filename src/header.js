import React from 'react';
import {  Header,  Text, Group, Button } from '@mantine/core';
import "./index.css"
import Logout from './Logout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
const SiteHeader = ({loggedIn, setLoggedIn}) => (

    <form >
        {console.log(loggedIn)}
        <Header height={{base: 70, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
              <Text size="lg" weight="boldest">University Searcher</Text>
              <div style={{"display":"flex", "justifyContent":"space-between"}}>
              <Link to="/search">
                <Button  style={{"marginRight":"1rem"}} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Home</Button>
              </Link>
              {!loggedIn && (<Link to="/signUp">  
                <Button  style={{"marginRight":"1rem"}} ariant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Sign Up</Button>
              </Link>)}
              {!loggedIn && (<Link to="/login">  
                <Button  ariant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Log in</Button>
              </Link>)}
              {loggedIn && <Logout setLoggedIn={setLoggedIn}/>}
              </div>
          </Group>
        </Header>
    </form>
);

export default SiteHeader;