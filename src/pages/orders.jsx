import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { cardWrapperStyles } from '@/components/styles';
import { useState, useEffect } from 'react';
import { useOrderData } from '@/context/orders.context';
import Card from '@/components/card';

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

const Orders = () => {
  const router = useRouter();
  const { orderDataState, loading } = useOrderData();
  const [dishId, setDishId] = useState('');
  const [clientId, setClientId] = useState('');
  console.log(orderDataState.data, 'mala');
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
    <div style={cardWrapperStyles}>
      {orderDataState.data?.map((order, idx) => {
        return (
          <Card
            item={order}
            cardButton
            butonText="Eliminar"
            key={idx}
            OnClick={() => deleteCurrentUser(user.id)}
          />
        );
      })}
    </div>
  );
};

export default Orders;
