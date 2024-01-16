import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { Client } from 'types/types';
import Card from '@/components/card';

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
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache, { data: { deleteClient: deleteClientId } }) {
      try {
        const { getClients } = cache.readQuery({ query: GET_CLIENTS });
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            getClients: getClients.filter(
              (currentClient: Client) => currentClient.id !== deleteClientId
            ),
          },
        });
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

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

  return (
    <>
      <Card data={sortedClients} />
      {sortedClients.map((client: Client, idx: number) => {
        const date = new Date(Number(client.created));
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return (
          <div key={idx}>
            <h1>{`${client.name} ${client.lastname}`}</h1>
            <div>
              <h4>{client.email}</h4>
              <h4>{client.phoneNumber}</h4>
              <h3>{client.order}</h3>
              <h3>{`${month}-${day}-${year}`}</h3>
              <button onClick={() => deleteCurrentClient(client.id)}>
                Eliminar
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Home;
