import { cardWrapperStyles } from '@/components/styles';
import { useQuery, gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Card from '@/components/card';
import { useState } from 'react';
import { useEffect } from 'react';

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
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data?.getUsers);
  }, [data]);

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
          await deleteUser({
            variables: {
              deleteUserId: id,
            },
          });
        } catch (error) {
          console.log(error);
        }
        Swal.fire('Deleted!', data.deleteUser, 'success');
      }
    });
  };
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div style={cardWrapperStyles}>
      {data?.getUsers.map((user, idx) => {
        return (
          <Card
            index={idx}
            item={user}
            deleteButton
            butonText="Eliminar"
            key={idx}
            OnClickDelete={() => deleteCurrentUser(user.id)}
          />
        );
      })}
    </div>
  );
};
export default Users;
