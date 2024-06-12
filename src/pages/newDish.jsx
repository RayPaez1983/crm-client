import React from 'react';
import { Formik, Form } from 'formik';
import { fromStyles, fromWrapperStyles } from '@/components/styles';
import CustomInput from '@/components/customInput';
import { useMenuData } from '@/context/menu.context';

const NewDish = () => {
  const { createNewPlate } = useMenuData();
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
          const { data } = await createNewPlate(
            vegetables,
            protein,
            price,
            inStock,
            dishName,
            carbohydrates
          );
          console.log(data, 'new plate');
        }}>
        {({
          errors,
          touched,
          /* and other goodies */
        }) => (
          <div style={fromWrapperStyles}>
            <Form style={fromStyles}>
              <label htmlFor="dishName">Nombre del plato</label>
              <CustomInput
                type="text"
                name="dishName"
                placeholder="Nombre del plato"
              />
              {errors.dishName && touched.dishName && errors.dishName}
              <label htmlFor="protein">Proteina</label>
              <CustomInput type="text" name="protein" placeholder="Proteina" />
              {errors.protein && touched.protein && errors.protein}
              <label htmlFor="carbohydrates">Carbohidratos</label>
              <CustomInput
                type="text"
                name="carbohydrates"
                placeholder="carbohidratos"
              />
              {errors.carbohydrates &&
                touched.carbohydrates &&
                errors.carbohydrates}
              <label htmlFor="vegetables">Vegetales</label>
              <CustomInput
                type="text"
                name="vegetables"
                placeholder="Vegetales"
              />
              {errors.vegetables && touched.vegetables && errors.vegetables}
              <label htmlFor="price">Precio</label>
              <CustomInput type="number" name="price" placeholder="Precio" />

              {errors.price && touched.price && errors.price}
              <label htmlFor="inStock">En stock</label>
              <CustomInput
                type="number"
                name="inStock"
                placeholder="En bodega"
              />
              {errors.inStock && touched.inStock && errors.inStock}
              <button type="submit">Submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NewDish;
