import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Logout = ({setLoggedIn}) => (
    <div>
        <Link to="/search">
            <Button onClick={()=>{setLoggedIn(false)}}>Logout</Button>
        </Link>
    </div> 
)

export default Logout;