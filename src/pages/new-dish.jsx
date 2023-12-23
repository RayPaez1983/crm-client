import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';

const NEW_DISH = gql`
  mutation newDish($input: dishInput) {
    newDish(input: $input) {
      vegetables
      protein
      price
      inStock
      id
      dishName
      created
      carbohydrates
    }
  }
`;

const NewDish = () => {
  const router = useRouter();
  const [newDish] = useMutation(NEW_DISH);
  return (
    <div>
      <Formik
        initialValues={{
          vegetables: '',
          protein: '',
          price: 0,
          inStock: 0,
          dishName: '',
          carbohydrates: '',
        }}
        onSubmit={async (values) => {
          const {
            vegetables,
            protein,
            price,
            inStock,
            dishName,
            carbohydrates,
          } = values;
          try {
            const { data } = await newDish({
              variables: {
                input: {
                  vegetables,
                  protein,
                  price,
                  inStock,
                  dishName,
                  carbohydrates,
                },
              },
            });
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
            <label htmlFor="dishName">Nombre del plato</label>
            <input
              type="dishName"
              name="dishName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dishName}
            />
            {errors.name && touched.name && errors.name}
            <label htmlFor="protein">Proteina</label>
            <input
              type="protein"
              name="protein"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.protein}
            />
            {errors.protein && touched.protein && errors.protein}
            <label htmlFor="carbohydrates">Carbohidratos</label>
            <input
              type="carbohydrates"
              name="carbohydrates"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.carbohydrates}
            />
            {errors.carbohydrates &&
              touched.carbohydrates &&
              errors.carbohydrates}
            <label htmlFor="vegetables">Vegetales</label>
            <input
              type="vegetables"
              name="vegetables"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.vegetables}
            />
            {errors.vegetables && touched.vegetables && errors.vegetables}
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
            {errors.price && touched.price && errors.price}
            <label htmlFor="inStock">En stock</label>
            <input
              type="number"
              name="inStock"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.inStock}
            />
            {errors.inStock && touched.inStock && errors.inStock}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewDish;
