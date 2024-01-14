import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {  Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/sign-in.context';
import { inputStyles } from './styles';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
}

const CustomInput = ({ name, type, placeholder }: InputProps) => {

  return (
    <>
      <Field style={inputStyles} type={type} name={name} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" />
    </>
  );
};

export default CustomInput;
