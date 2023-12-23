import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/sign-in.context';
import {fromStyles, fromWrapperStyles} from '@/components/styles';
import CustomInput from '@/components/customInput';

interface LoginValues {
  email: string;
  password: string;

}

const Login = ({email, password}: LoginValues) => {
  const router = useRouter();
  const { handleLogin, authState } = useAuth();
 console.log(authState.error,'que esto bro', password ? password : 'required')

  return (
    <>      
        <Formik
          initialValues={{ email: email, password: password }}
          validate={(values: LoginValues) => {
            const errors: Partial<LoginValues> = {};
          if (!values.password ) {
              errors.password = 'Required';
            }
            if (!values.email ) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (values: LoginValues) => {
            const { email, password } = values;
            try {
              handleLogin(email, password);
            } catch (error) {
              console.log(error);
            }
          }}>
          {() => (
            <div style={fromWrapperStyles}>
            <Form style={fromStyles}>
                <h1>Inicio de Sesion</h1>
              <CustomInput type="email" name="email" placeholder="Email" />
              <CustomInput type="password" name="password" placeholder="Password" />
              {authState.error ? <div> {authState.error}</div> : null}
              <button type="submit">Submit</button>
            </Form>
            </div>
          )}
        </Formik>
    </>
  );
};

export default Login;
