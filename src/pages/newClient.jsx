import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { fromStyles, fromWrapperStyles } from '@/components/styles';
import CustomInput from '@/components/customInput';

const NEW_CLIENT = gql`
  mutation Mutation($input: clientInput) {
    newClient(input: $input) {
      order
      phoneNumber
      name
      lastname
      email
    }
  }
`;
const GET_CLIENTS = gql`
  query GetClients {
    getClients {
      phoneNumber
      order
      name
      lastname
      id
      email
      created
    }
  }
`;

const NewClient = () => {
  const router = useRouter();
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: [...getClients, newClient],
        },
      });
    },
  });
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
            if (data) {
              router.push({
                pathname: `/clients`,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }}>
        {({
          errors,
          touched,

          /* and other goodies */
        }) => (
          <div style={fromWrapperStyles}>
            <Form style={fromStyles}>
              <h1>Nuevo Cliente</h1>
              <CustomInput type="name" name="name" placeholder="Nombre" />
              {errors.name && touched.name && errors.name}
              <CustomInput
                type="lastname"
                name="lastname"
                placeholder="Apellido"
              />
              {errors.lastname && touched.lastname && errors.lastname}
              <CustomInput
                type="email"
                name="email"
                placeholder="Correo Electronico"
              />
              {errors.email && touched.email && errors.email}
              <CustomInput
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Telefono"
              />
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
              <CustomInput type="order" name="order" placeholder="Orden" />
              {errors.order && touched.order && errors.order}
              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NewClient;
