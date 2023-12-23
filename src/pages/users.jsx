import { useRouter } from 'next/router';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import WrapperComponent from '../components/wrapper';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      lastname
      id
      email
      created
    }
  }
`;
const DELETE_USER = gql`
  mutation Mutation($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  const deleteCurrentUser = async (id) => {
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
          const { data } = await deleteUser({
            variables: {
              deleteUserId: id,
            },
          });
          console.log(data.deleteUser);
        } catch (error) {
          console.log(error);
        }
        console.log(id);
        Swal.fire('Deleted!', data.deleteUser, 'success');
      }
    });
    console.log(data, 'delete client');
  };
  if (loading) {
    return <h1>Loading</h1>;
  }
  console.log(data, ' ladata barata');
  return (
    <>
      {data?.getUsers.map((user, idx) => {
        console.log(user.id);
        const date = new Date(Number(user.created));
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return (
          <div key={idx}>
            <h1>{`${user.name} ${user.lastname}`}</h1>
            <div>
              <h4>{user.email}</h4>
              <h3>{`${month}-${day}-${year}`}</h3>
            </div>
            <button onClick={() => deleteCurrentUser(user.id)}>Eliminar</button>
          </div>
        );
      })}
    </>
  );
};
export default Users;
