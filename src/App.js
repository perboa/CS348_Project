import React from 'react';
import "./index.css";
import SearchBar from "./search.js";
import { MantineProvider } from '@mantine/core';
import { Table } from '@mantine/core';

const posts = [
    { id: '2', name: 'University of Waterloo', city: "Waterloo", state: "ON", country: "CA"},
    { id: '3', name: 'Harvard University', city: "Cambridge", state: "MA", country: "US"},
    { id: '4', name: 'University of Toronto', city: "Toronto", state: "ON", country: "CA"},
    { id: '5', name: 'Western University', city: "London", state: "ON", country: "CA"},
    { id: '6', name: 'Massachusetts Institute of Technology', city: "Cambridge", state: "MA", country: "US"},
    { id: '7', name: 'Stanford University', city: "Stanford", state: "CA", country: "US"},
    { id: '8', name: 'Princeton University', city: "Princeton", state: "NJ", country: "US"},
    { id: '9', name: 'Columbia University', city: "New York", state: "NY", country: "US"},
    { id: '10', name: 'Yale University', city: "New Haven", state: "CT", country: "US"},
    { id: '11', name: 'Queens University', city: "Kingston", state: "ON", country: "CA"},
    { id: '12', name: 'University of British Columbia', city: "Vancouver", state: "BC", country: "CA"},
];


const filterPosts = (posts, query) => {
    if (!query) {
        return [];
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query.toLowerCase());
    });
};
document.body.style.backgroundColor = "#D7E5F0"

const App = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filteredPosts = filterPosts(posts, query);
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <div class="box">
                <div class="inner1">
                    <SearchBar />
                </div>  
                <div class="inner2">
                            <ul>
                                {filteredPosts.map(post => (                    
                                    <li key={post.key}>University: {post.name}, City: {post.city}, State/Province: {post.state}, Country: {post.country}</li>
                                ))}
                            </ul>
                </div>
                
            </div>
        </MantineProvider>
    );
}

export default App;