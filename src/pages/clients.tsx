import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Client } from 'types/types';
import Card from '@/components/card';
import { cardWrapperStyles } from '@/components/styles';

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
const DELETE_CLIENT = gql`
  mutation DeleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const deleteCurrentClient = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await deleteClient({
            variables: {
              deleteClientId: id,
            },
          });
          Swal.fire('Deleted!', data.deleteClient, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  if (loading) {
    return <h1>Loading</h1>;
  }

  const sortedClients = data.getClients
    .slice()
    .sort((a: any, b: any) => b.created - a.created);
  console.log(sortedClients);
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
            OnClickDelete={() => deleteCurrentClient(client.id)}
            OnClick={() => alert(client.id)}
          />
        );
      })}
    </div>
  );
};
export default Home;
