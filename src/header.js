import React from 'react';
import {  Header,  Text, Group, Button } from '@mantine/core';
import "./index.css"
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
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
        <Header class="shadow-xl shadow-blue-400/20 bg-blue-800/[0.9] h-20" height={{base: 70, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
              <Text class="text-slate-100 font-semibold text-3xl pl-5" size="xl" weight="boldest">UReview</Text>
              <div style={{"display":"flex", "justifyContent":"space-between"}}>
              <Link to="/search">
              <Button class="text-slate-100 font-semibold mr-10 hover:shadow-md" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              <FontAwesomeIcon class="hover:text-slate-300 h-8 text-center" icon={icon({name: 'home', style:'solid'})}/>
                </Button>
              </Link>
              {!loggedIn && (<Link to="/signUp">  
                <Button class="text-slate-100 font-semibold text-2xl mr-10" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                  <p class="hover:text-slate-300">Sign Up</p>
                </Button>
              </Link>)}
              {!loggedIn && (<Link to="/login">  
                <Button class="text-slate-100 font-semibold text-2xl mr-5" ariant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                <p class="hover:text-slate-300">Log In</p>
                </Button>
              </Link>)}
              {loggedIn && <Logout setLoggedIn={setLoggedIn}/>}
              </div>
          </Group>
        </Header>
    </form>
);

export default SiteHeader;