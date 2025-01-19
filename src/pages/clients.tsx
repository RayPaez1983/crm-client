import { Client } from 'types/types';
import Card from '@/components/card';
import { cardWrapperStyles } from '@/components/styles';
import { useClientsData } from '@/context/clients.context';
const Home = () => {
  const { clientsDataState, deleteClientOnClick } = useClientsData();

  if (clientsDataState.loading) {
    return <h1>Loading</h1>;
  }

  const sortedClients = clientsDataState.data
    .slice()
    .sort((a: any, b: any) => b.created - a.created);

  return (
    <div style={cardWrapperStyles}>
      {sortedClients.map((client: Client, idx: number) => {
        return (
          <Card
            index={idx}
            key={idx}
            item={client}
            deleteButton
            butonText="Eliminar"
            OnClickDelete={() => deleteClientOnClick(client.id)}
            OnClick={() => alert(client.id)}
          />
        );
      })}
    </div>
  );
};
export default Home;
