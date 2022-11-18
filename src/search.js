import {React, useState} from 'react';
import {Paper, Container, Button, Box, Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useNavigate,
    useParams,
  } from "react-router-dom";
import LoginForm from './login';
import Form from './Form';
import Logout from './Logout';
import SiteHeader from './header';
import axios from "axios";
import "./index.css"

const Search = ({ setLoggedIn }) => {
  const [value, setValue] = useState('');
  const form = useForm({
      initialValues: {
        searchTerm: '',
    },
  });

  const [isShown, setIsShown] = useState(false);

  const history = useNavigate();
  const saveChanges = async ({term}) =>{
    console.log("Got here")
    const mypath = "?q=" + encodeURI(form.values.searchTerm);
    history(mypath);
    setIsShown(true);
  };
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

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const data = posts.map((item) => ({ ...item, value: item.name }));
  
  const renderCond = curData => (
    isShown ? 
        <div> 
          <ul>
            {curData.map(item => {
              return 
              <Paper shadow="xs" p="md">
                <li>{item.name}</li>
                <li>{item.city}</li>
              </Paper>
          })}
          </ul>
        </div> 
      : <div></div>
      )

  return(
        <div className='search'>
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <div className="inner1">
                  <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Autocomplete
                      label="Enter a university to search for..."
                      placeholder="Start typing to see options"
                      data={data}
                      filter={(value, item) =>
                        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
                        item.city.toLowerCase().includes(value.toLowerCase().trim())
                      }
                      onChange={(e)=>{
                            console.log(e)
                            console.log("Search page")
                            form.setFieldValue('searchTerm', e);
                      }}
                    />

                    <Button type="submit" onClick={()=>{ 
                                        console.log("Search term: ")
                                        console.log(form.values.searchTerm)
                                        saveChanges(form.values.searchTerm);
                                        console.log(filterPosts(posts, form.values.searchTerm));
                                       }}>Submit</Button>
                  </form>
                  <div>
                  <Box sx={{ maxWidth: 300 }} mx="auto">
                  {renderCond(filterPosts(posts, form.values.searchTerm))}
                  </Box>
                  </div>

                </div>  
            
            </Box>  
        </div>

  )
};
export default Search;