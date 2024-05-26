import { cardStyles, cardWrapperStyles } from '@/components/styles';
import { useToken } from '@/context/token.context';
import { useMenuData } from '@/context/getMenu.context';
import { Menu } from '../../types/types';
import Card from '@/components/card';

const Home = () => {
  const { tokenState } = useToken();
  const { menuDataState } = useMenuData();

  if (menuDataState.loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div style={cardWrapperStyles}>
      {menuDataState.data && tokenState.token ? (
        menuDataState.data.map((dish: Menu, idx: number) => (
          <Card
            item={dish}
            key={idx}
            OnClickDelete={() => console.log(dish, idx)}
          />
        ))
      ) : (
        <div>Restaurant App</div>
      )}
    </div>
  );
};
export default Home;
