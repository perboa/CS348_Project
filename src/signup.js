import { TextInput, PasswordInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./index.css";
import axios from "axios";
import history from "history/browser"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  withRouter
} from 'react-router-dom';


const SignUp = (props) =>{
  const saveChanges = async () =>{

    try {  
        const url = 'http://127.0.0.1:5000/signup'
        const data = {
            email: form.values.email,
            password: form.values.password,
            firstName: form.values.firstName,
            lastName:form.values.lastName

        };
        console.log("about to make request")
        const value = await axios.post(url,data)
        console.log(value)
        console.log(value.data)
        if(value.data == "True"){ 
          history.push('/search')
        }
        else if ((value.data == "False") || (form.values.termsOfService == false)){
            document.getElementById('errorMessage').style.display='block';
        }
    } catch (error) {
        console.log(error)
    } 
}
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
      },
  
      validate: {
      firstName: (value) => (value.length < 2 ? 'First name is too short' : null),
      lastName: (value) => (value.length < 2 ? 'Last name is too short' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
      },
    });
  
  return (
    <>
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>

		<TextInput
          withAsterisk
          label="First Name"
          placeholder="Your first name"
          {...form.getInputProps('firstName')}
          onChange={(e)=>{
            form.setFieldValue('firstName', e.target.value);
        }}
        />
		
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Your last name"
          {...form.getInputProps('lastName')}
          onChange={(e)=>{
            form.setFieldValue('lastName', e.target.value);
        }}
        />
		
		<TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          onChange={(e)=>{
            form.setFieldValue('email', e.target.value);
        }}
        />
		
		<PasswordInput
          withAsterisk
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps('password')}
          onChange={(e)=>{
            form.setFieldValue('password', e.target.value);
        }}
        />
		
		<PasswordInput
          withAsterisk
		  mt="sm"
          label="Confirm Password"
          placeholder="Retype your password"
          {...form.getInputProps('confirmPassword')}
          onChange={(e)=>{
            form.setFieldValue('confirmPassword', e.target.value);
        }}
        />

        <Checkbox
          mt="md"
          label="I agree to the Terms of Service"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <div>
          <Link to="/search"> 
              <Button className="hover:bg-blue-800 bg-blue-600" type="submit" onClick={()=>{ saveChanges(); }}>Submit</Button>
          </Link>
          </div>
        </Group>
      </form>
    </Box>
    </>
  )}

export default SignUp;
