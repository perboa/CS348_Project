import { TextInput, PasswordInput, Checkbox, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./index.css";
import axios from "axios";

const { readFileSync } = require('fs');

function readtxt(filename) {
	const contents = readFileSync(filename, 'utf-8');
	const arr = contents.split(\r?\n/);
	return arr;
}

const univ = readtxt('./unilist.txt');

const SignUp = () =>{

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
        />
		
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Your last name"
          {...form.getInputProps('lastName')}
        />
		
		<Select
			label="Your university"
			placeholder="Select one"
			searchable
			nothingFound="No options"
			maxDropdownHeight={280}
			data={univ}
		/>
		
		<Select
			label="Your program"
			placeholder="Select one"
			searchable
			nothingFound="No options"
			data={["General Agriculture", "Fine Arts", "Biology", "Ecology", 
					"Business Management and Administration", "Economics", 
					"Computer and Information Systems", "Mathematics", 
					"Mechanical Engineering", "Chemistry", 
					"Health and Medical Preparatory Programs", 
					"Interdisciplinary Studies"]}
		/>
		
		<TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
		
		<PasswordInput
          withAsterisk
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps('password')}
        />
		
		<PasswordInput
          withAsterisk
		  mt="sm"
          label="Confirm Password"
          placeholder="Retype your password"
          {...form.getInputProps('confirmPassword')}
        />

        <Checkbox
          mt="md"
          label="I agree to the Terms of Service"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button  type="submit">Sign Up</Button>
        </Group>
      </form>
    </Box>
    </>
  )}
export default SignUp;
