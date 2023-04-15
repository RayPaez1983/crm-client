import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';

const NEW_CLIENT = gql`
  mutation Mutation($input: clientInput) {
    newClient(input: $input) {
      waiter
      order
      phoneNumber
      name
      lastname
      email
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [newClient] = useMutation(NEW_CLIENT);
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
          const { name, lastname, email, phoneNumber, order } = values;
          try {
            const { data } = await newClient({
              variables: {
                input: {
                  name,
                  lastname,
                  email,
                  phoneNumber,
                  order,
                },
              },
            });
            console.log(data, 'my data');
            if (data) {
              router.push({
                pathname: `/clients`,
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
            <label htmlFor="name">Nombre</label>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
            <label htmlFor="lastname">Apellido</label>
            <input
              type="lastname"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            {errors.lastname && touched.lastname && errors.lastname}
            <label htmlFor="email">Correo Electronico</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <label htmlFor="phoneNumber">Telefono</label>
            <input
              type="phoneNumber"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            <label htmlFor="order">Orden</label>
            <input
              type="order"
              name="order"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.order}
            />
            {errors.order && touched.order && errors.order}
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
