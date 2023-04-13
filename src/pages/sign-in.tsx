import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';

const AUTH_USER = gql`
  mutation authUser($input: authInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [authUser] = useMutation(AUTH_USER);
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {
            email: '',
          };
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const { email, password } = values;
          try {
            const { data } = await authUser({
              variables: {
                input: {
                  email,
                  password,
                },
              },
            });
            const token = data.authUser.token;
            localStorage.setItem('token', token);
            if (token) {
              router.push({
                pathname: `/`,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
