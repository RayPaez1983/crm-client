import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      user
      total
      state
      order {
        quantity
        id
      }
      id
      created
      client
    }
  }
`;

const GET_DISH = gql`
  query Query($getDishId: ID!) {
    getDish(id: $getDishId) {
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
const GET_CLIENT = gql`
  query GetClient($getClientId: ID!) {
    getClient(id: $getClientId) {
      phoneNumber
      order
      name
      lastname
      email
      id
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const [dishId, setDishId] = useState('');
  const [clientId, setClientId] = useState('');

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useQuery(GET_ORDERS);

  const {
    data: clientData,
    loading: clientLoading,
    error: clientError,
  } = useQuery(GET_CLIENT, {
    variables: { getClientId: clientId },
    skip: !clientId, // Skip the query if dishId is not set
  });
  const {
    data: dishData,
    loading: dishLoading,
    error: dishError,
  } = useQuery(GET_DISH, {
    variables: { getDishId: dishId },
    skip: !dishId, // Skip the query if dishId is not set
  });

  useEffect(() => {
    console.log(ordersData, 'que pasaqui mi brotheeer');
    // Use useEffect to set dishId after the component has rendered
    ordersData?.getOrders.forEach((order) => {
      setClientId(order.client);
      order.order.forEach((item) => {
        setDishId(item.id);
      });
    });
  }, [ordersData]); // Run the effect when ordersData changes

  if (ordersLoading) {
    return <h1>Loading</h1>;
  }
  console.log(
    clientData?.getClient.name,
    'dura la vuelta',
    ordersData.getOrders,
    dishData?.getDish
  );
  return (
    <>
      {ordersData?.getOrders.map((order, idx) => {
        const date = new Date(Number(order.created));
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return (
          <div key={idx}>
            <div>
              <h4>{order.state}</h4>
              <h4>{order.total}</h4>
              <h3>{`${month}-${day}-${year}`}</h3>

              {/* Fetch and display dish information */}

              {dishData?.getDish && (
                <div>
                  <h2>{dishData.getDish.dishName}</h2>
                  {/* Add more dish information as needed */}
                </div>
              )}
              <div>{clientData?.getClient.name}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
