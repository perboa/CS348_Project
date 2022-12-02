import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./index.css"
import history from "history/browser"
import axios from "axios";
import { Link, Router } from 'react-router-dom';

const LoginForm = (props) =>{
  console.log(props)
    const saveChanges = async () =>{

        try {
<<<<<<< HEAD
=======
            //if( form.values.email === 'mar@abc.com')  
            //{ props.setLoggedIn(true);
            //  history.push('/search')
            //} else {
            //  document.getElementById('errorMessage').style.display='block';
            //}

            //if (form.values.termsOfService == false){
            //  document.getElementById('errorMessagetwo').style.display='block';
            //  return;
            //} 
>>>>>>> ebd7776cad10c1d9bfa84edbe9048315f413ee9e
            const url = 'http://127.0.0.1:5000/login'
            const data = {
                email: form.values.email,
                password: form.values.password
            };
            console.log("about to make request")
            const value = await axios.post(url,data)
            console.log(value)
<<<<<<< HEAD
            if(value.data[0] == "True"){ 
              props.setLoggedIn(true)
              console.log(value.data[0])
              console.log(value.data[1])
              props.setid(value.data[1])
              
=======
            if(value.data == "True"){ 
              props.setLoggedIn(true)
>>>>>>> ebd7776cad10c1d9bfa84edbe9048315f413ee9e
              history.push('/search')}
            else if ((value.data == "False") || (form.values.termsOfService == false)){
              props.setLoggedIn(false)
                document.getElementById('errorMessage').style.display='block';
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },
    /* Fix Later */
    /*validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },*/
  });

  return (
    <div className='login'>
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email address"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          onChange={(e)=>{
                form.setFieldValue('email', e.target.value);
            }}

        />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          {...form.getInputProps('password')}
          onChange={(e)=>{
                form.setFieldValue('password', e.target.value);
            }}

        />
        <Checkbox
          mt="md"
          label="I agree to the terms and conditions"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
        <div className='errorMessage' id='errorMessage'>Invalid email or password, please also make sure you have accepted terms and conditions</div>
        <div className='errorMessage' id='errorMessagetwo'>You have to accept the terms and conditions to continue</div>
          <div>
            
              <Button className="hover:bg-blue-800 bg-blue-600" type="submit" onClick={()=>{ saveChanges(); }}>Submit</Button>
            
          </div>
        </Group>
      </form>
    </Box>
    </div>
)};
export default LoginForm;