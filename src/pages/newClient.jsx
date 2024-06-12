import React from 'react';
import { Formik, Form } from 'formik';
import { useClientsData } from '@/context/clients.context';
import { fromStyles, fromWrapperStyles } from '@/components/styles';
import CustomInput from '@/components/customInput';

const NewClient = () => {
  const { createNewClient } = useClientsData();
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
          createNewClient(name, lastname, email, phoneNumber, order);
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
