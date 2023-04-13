import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';

const NEW_USER = gql`
  mutation newUser($input: userInput) {
    newUser(input: $input) {
      name
      lastname
      id
      email
      created
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [newUser] = useMutation(NEW_USER);
  return (
    <div>
      <Formik
        initialValues={{ name: '', lastName: '', email: '', password: '' }}
        validate={(values) => {
          const errors = {};
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
          const { name, lastname, email, password } = values;
          try {
            const { data } = await newUser({
              variables: {
                input: {
                  name,
                  lastname,
                  email,
                  password,
                },
              },
            });
            console.log(data, 'my data');
            if (data) {
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
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <input
              type="lastname"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            {errors.lastname && touched.lastname && errors.lastname}
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

export default SignUp;
