import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./index.css"
import axios from "axios";
//import axios check if server is corect

const LoginForm = ({ setLoggedIn }) =>{
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
          <Button type="submit" onClick={()=>{ saveChanges(); }}>Submit</Button>
        </Group>
      </form>
    </Box>
    </div>
)};
export default LoginForm;

