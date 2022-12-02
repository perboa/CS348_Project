import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Logout = ({setLoggedIn}) => (
    <div>
        <Link to="/search">
            <Button class="text-slate-100 font-semibold text-2xl mr-10 hover:text-slate-300" onClick={()=>{setLoggedIn(false)}}>Logout</Button>
        </Link>
    </div> 
)

export default Logout;