import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
const inter = Inter({ subsets: ['latin'] });

const menuQuery = gql`
  query GetMenu {
    getMenu {
      dishName
      inStock
      protein
      vegetables
      price
      carbohydrates
    }
  }
`;

const Home = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(menuQuery);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div
        onClick={() =>
          router.push({
            pathname: `/sign-up`,
          })
        }
      >
        Registrarse
      </div>
       <div
        onClick={() =>
          router.push({
            pathname: `/sign-in`,
          })
        }
      >
        Iniciar Sesion
      </div>
      {data?.getMenu.map((dish: any, idx: number) => {
        return (
          <div key={idx}>
            <h1>{dish.dishName}</h1>
            <div>
              <h4>{dish.protein}</h4>
              <h4>{dish.carbohydrates}</h4>
              <h4>{dish.vegetables}</h4>
              <h3>{dish.price}</h3>
              <h3>{dish.inStock}</h3>
            </div>
          </div>
        );
      })}
      <div
        onClick={() =>
          router.push({
            pathname: `/new-dish`,
          })
        }
      >
        Nuevo Plato
      </div>
    </>
  );
};
export default Home;
