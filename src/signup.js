import { TextInput, PasswordInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./index.css";
import axios from "axios";

const form = useForm({
	initialValues: {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		confirmPassword: '',
		termsOfService: false,
    },

    validate: {
		first_name: (value) => (value.length < 2 ? 'First name is too short' : null),
		last_name: (value) => (value.length < 2 ? 'Last name is too short' : null),
		email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		confirmPassword: (value, values) =>
			value !== values.password ? 'Passwords did not match' : null,
    },
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
		<TextInput
          withAsterisk
          label="First Name"
          placeholder="Your first name"
          {...form.getInputProps('first_name')}
        />
		
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Your last name"
          {...form.getInputProps('last_name')}
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
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>
    </Box>
  );
}