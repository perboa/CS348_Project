import {React, useState, useEffect} from 'react';
import {
    Card,
    Badge, 
    Image,
    Paper, 
    Container, 
    MantineProvider,
    Button, 
    Box, 
    Group, 
    Avatar, 
    Text, 
    MantineColor, 
    SelectItemProps,
    Stack,
    Autocomplete,
    Space
  } from '@mantine/core';
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
const Search = () => {

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

  const[posts, setPosts] = useState([
    { id: '1', name: 'University of British Columbia', city: "Vancouver", state: "BC", country: "CA"}
  ]);

    const handleFunctionAdd = (obj) => {
        setPosts(posts => [...posts, obj]);
    };


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


  useEffect(() => {
        // call api or anything
          const getApiData = async (a) => {
            console.log("Loaded")
            console.log(a)
            const response = await fetch(
              `http://localhost:5000/colleges/base-info?ID=${encodeURIComponent(a)}`, {method: 'GET', dataType: 'json'}
            ).then((response) => response.json())
             .then((responseJSON) => {console.log(responseJSON);  handleFunctionAdd(responseJSON)});
            // update the state
            //handleFunctionAdd()
            //console.log(posts);
          };
          //getApiData('1').catch(console.error)
          getApiData('2').catch(console.error)
          getApiData('3').catch(console.error)
          getApiData('4').catch(console.error)
          getApiData('5').catch(console.error)
          getApiData('6').catch(console.error)
          getApiData('7').catch(console.error)
          getApiData('8').catch(console.error)
          getApiData('9').catch(console.error)
          getApiData('10').catch(console.error)
          getApiData('11').catch(console.error)



  }, []);
  const routeChange = (id) =>{ 
    let path = `/college/` + encodeURI(id); 
    history(path);
    window.location.reload();
  }

  const renderCond = curData => (
    isShown ? 
        <div> 
          <ul>
            {curData.map(item => {
              return (
                <Group>
                  <Card shadow="lg" p="lg" radius="lg" withBorder>
                    <Card.Section>
                      <Image
                        src="logos/Columbia University.png"

                        height={160}
                      />
                    </Card.Section>
                    
                  <Group position="apart" mt="lg" mb="md">
                    <Text>{item.name} -- {item.city}, {item.state} </Text>
                    </Group>
        
                  <Button variant='outline' type="submit" onClick={()=>{ 
                                        console.log("Tested");
                                        
                                        routeChange(item.id)
                                       }}>
                                       More info
                  </Button>
                  </Card>
                  <Space h="lg" />
                </Group>    
              )
          })}
          </ul>
        </div> 
      : <div></div>
      )

  return(
      <MantineProvider
      theme={{
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}>
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
                    <Button type="submit" className="hover:bg-blue-800 bg-blue-600" onClick={()=>{ 
                                        console.log("Search term: ")
                                        console.log(form.values.searchTerm)
                                        saveChanges(form.values.searchTerm);
                                        console.log(filterPosts(posts, form.values.searchTerm));
                                       }}>Submit</Button>
                  </form>
                  <Space h="lg" />
                  <div>
                  <Box sx={{ maxWidth: 300 }} mx="auto">
                  {renderCond(filterPosts(posts, form.values.searchTerm))}
                  </Box>
                  </div>

                </div>  
            
            </Box>  
        </div>
        </MantineProvider>
  )
};
export default Search;