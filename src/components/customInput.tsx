import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { inputStyles } from './styles';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
}

const CustomInput = ({ name, type, placeholder }: InputProps) => {
  return (
    <>
      <Field
        style={inputStyles}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" />
    </>
  );
};

export default CustomInput;
