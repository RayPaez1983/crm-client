import { cardWrapperStyles } from '@/components/styles';
import Card from '@/components/card';
import { useUsersContext } from './../context/users.context';

const Users = () => {
  const { usersState, deleteUserOnClick } = useUsersContext();

  if (usersState.loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div style={cardWrapperStyles}>
      {usersState.data.getUsers?.map((user, idx) => {
        return (
          <Card
            index={idx}
            item={user}
            deleteButton
            butonText="Eliminar"
            key={idx}
            OnClickDelete={() => deleteUserOnClick(user.id)}
          />
        );
      })}
    </div>
  );
};
export default Users;
