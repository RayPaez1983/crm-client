import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@/context/sign-in.context';
import { useToken } from '@/context/token.context';
import { Menu } from 'types/types';
import { useEffect } from 'react';
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

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
  <>
      {data && tokenState.token ? (
      
         <Card data={data.getMenu}/>
       
       
       
        
      ) : (
        <div>Restaurant App</div>
      )}
    </>
  );
};
export default Home;
