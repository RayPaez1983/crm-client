import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@/context/sign-in.context';
import { useToken } from '@/context/token.context';

const GET_MENU_QUERY = gql`
  query getMenu {
    getMenu {
      dishName
      inStock
      price
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_MENU_QUERY);
  const { tokenState } = useToken();
  console.log(tokenState.token, 'que paso otra vez', data);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {data && tokenState.token ? (
        data.getMenu.map((menu: any, key: number) => (
          <ul key={key}>
            <li>Nombre: {menu.dishName}</li>
            <li>Cantidad: {menu.inStock}</li>
            <li>Precio: {menu.price}</li>
          </ul>
        ))
      ) : (
        <div>Restaurant App</div>
      )}
    </>
  );
};
export default Home;
