import React from 'react';
import { Button } from '@mantine/core';

const Logout = ({setLoggedIn}) => (
    <div>
        <Button onClick={()=>{setLoggedIn(false)}}>Logout</Button>
    </div> 
)

export default Logout;