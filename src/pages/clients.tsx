import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
const inter = Inter({ subsets: ['latin'] });

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

const Home = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log(data, ' ladata barata');
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
      {data?.getClients.map((dish: any, idx: number) => {
        const date = new Date(Number(dish.created));
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return (
          <div key={idx}>
            <h1>{`${dish.name} ${dish.lastname}`}</h1>
            <div>
              <h4>{dish.email}</h4>
              <h4>{dish.phoneNumber}</h4>
              <h3>{dish.order}</h3>
              <h3>{`${month}-${day}-${year}`}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Home;
