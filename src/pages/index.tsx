import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const CLIENT_USER_QUERY = gql`
 query GetClientUser {
  getClientUser {
    phoneNumber
    order
    name
    lastname
    email
  }
}
`;


const Home = () => {
  const router = useRouter();
   const { data, loading, error } = useQuery(CLIENT_USER_QUERY);
   const signOut = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };
console.log(data, 'data aqui')
  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div
        onClick={() =>
          router.push({
            pathname: `/sign-up`,
          })
        }
      >
        Registrarse
      </div>
       <div
        onClick={() =>
          router.push({
            pathname: `/sign-in`,
          })
        }
      >
        Iniciar Sesion
      </div>
       <div
        onClick={() =>
          router.push({
            pathname: `/clients`,
          })
        }
      >
        Clientes
      </div>
      <div
        onClick={() =>
          router.push({
            pathname: `/users`,
          })
        }
      >
        Users
      </div>
       <div
        onClick={() =>
          router.push({
            pathname: `/newClient`,
          })
        }
      >
        Nuevo Clientes
      </div>
        <div
        onClick={() =>
          router.push({
            pathname: `/orders`,
          })
        }
      >
        Ordenes
      </div>
       <div
        onClick={signOut}
      >
        Cerrar Sesion
      </div>
     
      <div
        onClick={() =>
          router.push({
            pathname: `/new-dish`,
          })
        }
      >
        Nuevo Plato
      </div>
    </>
  );
};
export default Home;
