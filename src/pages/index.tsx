import { useQuery, gql } from '@apollo/client';
import { useToken } from '@/context/token.context';
import { useMenuData} from '@/context/getMenu.context'
import Card from '@/components/card';

const GET_MENU_QUERY = gql`
  query getMenu {
    getMenu {
      id
      dishName
      protein
      carbohydrates
      vegetables
      inStock
      price
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_MENU_QUERY);
  const { tokenState } = useToken();
  const { menuDataState } = useMenuData()
  console.log(menuDataState.data
    , 'que jue')

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {menuDataState.data && tokenState.token ? (
        
        <Card data={menuDataState.data} />
       
      ) : (
        <div>Restaurant App</div>
      )}
    </>
  );
};
export default Home;
