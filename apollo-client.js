import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer${token}` : '',
    },
  };
});
const client = new ApolloClient({
  connectToDevTools: true,
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
