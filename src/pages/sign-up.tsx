import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {fromStyles, fromWrapperStyles} from '@/components/styles';
import { newUser } from '../context/sign-up.context';
import CustomInput from '@/components/customInput';

interface SignUpValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();

  const { handleSignUp, newUserState } = newUser();
console.log(Object.keys(newUserState.dataSignUp).length, 'callar')
  return (

      <Formik
        initialValues={{ name: '', lastName: '', email: '', password: '' }}
        validate={(values: SignUpValues) => {
          console.log(values, 'qie es esto mami')
          const errors: Partial<SignUpValues> = {};
           if (!values.name) {
            errors.name = 'Required';
          }
            if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values: SignUpValues) => {
          const { name, lastName, email, password } = values;
          try {
            await handleSignUp(name, lastName, email, password);

            if (newUserState.dataSignUp ) {
              router.push({
                pathname: `/sign-in`,
              });
            }
          } catch (error) {
            console.error('SignUp failed:', error);
            // Handle the error more appropriately, e.g., display an error message to the user
          }
        }}
        
      >
        {() => (
          <div style={fromWrapperStyles}>
           <Form style={fromStyles}>
            <h1>Registro</h1>
            <CustomInput
              type="text"
              name="name"
              placeholder="Name"
            />
            

            <CustomInput
              type="text"
              name="lastName"
              placeholder="Last Name"
            />

            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
            />
          

            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
            />
            

            <button type="submit">Submit</button>
          </Form>
          </div>
        )}
      </Formik>
  
  );
};

export default SignUp;
