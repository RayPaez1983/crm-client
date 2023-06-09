import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

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
  mutation Mutation($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`;

const Home = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { getClients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClients: getClients.filter(
            (currentClient) => currentClient.id !== deleteClientId
          ),
        },
      });
    },
  });

  const deleteCurrentClient = async (id) => {
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
          console.log(data.deleteClient);
        } catch (error) {
          console.log(error);
        }
        console.log(id);
        Swal.fire('Deleted!', data.deleteClient, 'success');
      }
    });
    console.log(data, 'dlete client');
  };
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
      {data?.getClients.map((client, idx) => {
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
