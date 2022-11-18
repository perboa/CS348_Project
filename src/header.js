import React from 'react';
import SearchBar from "./search.js";
import ReactDOM from 'react-dom';
import { AppShell, Navbar, Header, Aside, Footer, Text, Group, Button } from '@mantine/core';
import "./index.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
const SiteHeader = () => (
    <form action="/" method="get">
        <Header height={{base: 70, md: 70 }} p="md">
          <Group sx={{ height: '100%' }} px={20} position="apart">
              <Text size="lg" weight="boldest">University Searcher</Text>
              <Link to="/search">
              <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Home</Button>
              </Link>
                
              
          </Group>
          
        </Header>
    </form>
);

export default SiteHeader;