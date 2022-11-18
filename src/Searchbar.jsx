import {React, useState} from 'react';
import {Box, Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete} from '@mantine/core';
import { useForm} from '@mantine/form';
import "./index.css"

const SearchBar = ({ setLoggedIn }) => {
  const form = useForm({
      initialValues: {
        searchTerm: ''
    }
  });
      const saveChanges = async () =>{

        try {
            if( form.values.email === 'mar@abc.com') setLoggedIn(true) ;
            // WIP - still gotta fix backend stuff
            //const url = 'api/login'
            //const data = {
            //    email: form.values.email,
            //    password: form.values.password
            //};
            //const value = await axios.post(url,data)
            //if(value){ setLoggedIn(true)}
            //else{
            //    setLoggedIn(false)
            //}
        } catch (error) {
            console.log(error)
        }
    }
  return(
              <Box sx={{ maxWidth: 300 }} mx="auto">
                <div class="inner1">
                  <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Autocomplete
                      label="Enter a university to search for..."
                      placeholder="Start typing to see options"
                      data={['University of Waterloo', 'Western University', 'Massachussetts Institute of Technology', 'Harvard University']}
                      {...form.getInputProps('searchTerm')}
                      onChange={(e)=>{
                            form.setFieldValue('searchTerm', e.target.value);
                      }}
                    />
                  </form>
                </div>
              </Box>  
       
  )
};
export default SearchBar;