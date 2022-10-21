import React from 'react';
import { Button } from '@mantine/core';
import "./index.css"
const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search universities</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search universities"
            name="s" 
        />
        <Button type="submit">Search</Button>
    </form>
);    

export default SearchBar;