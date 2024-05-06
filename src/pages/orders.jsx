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

const GET_MENU = gql`
  query GetMenu {
    getMenu {
      id
      inStock
      dishName
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
    data: menuData,
    loading: dishLoading,
    error: dishError,
  } = useQuery(GET_MENU);

  useEffect(() => {
    console.log(ordersData, 'que pasaqui mi brotheeer', menuData);
    // Use useEffect to set dishId after the component has rendered
    ordersData?.getOrders.map((order) => {
      console.log(order.order, 'is more than welcome', order);
      setClientId(order.client);
      order.order?.map((item) => {
        menuData?.getMenu.map((dish) => {
          console.log(dish, item, order, 'no viene');
        });
        setDishId(item.id);
        console.log(clientData, 'no viene esta vuelta');
      });
    });
  }, [ordersData, clientData]); // Run the effect when ordersData changes

  if (ordersLoading) {
    return <h1>Loading</h1>;
  }

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

              {order.order.map((item) => item.id)}

              <div>{order.client}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
