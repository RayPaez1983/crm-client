import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
const inter = Inter({ subsets: ['latin'] });

const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      waiter
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
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div
        onClick={() =>
          router.push({
            pathname: `/`,
          })
        }
      >
        Home
      </div>
      {data?.getOrders.map((order, idx) => {
        const date = new Date(Number(order.created));
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return (
          <div key={idx}>
            <h1>{`${order.client}`}</h1>
            <div>
              <h4>{order.state}</h4>
              <h4>{order.total}</h4>
              <h3>{`${month}-${day}-${year}`}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Home;
