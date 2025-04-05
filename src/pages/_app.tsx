import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import {AuthProvider} from "../context/sign-in.context"
import {NewUserProvider} from "../context/sign-up.context"
import {TokenProvider} from "../context/token.context"
import { MenuDataProvider } from '@/context/menu.context';
import { OrderDataProvider } from '@/context/orders.context';
import { ClientsDataProvider } from '@/context/clients.context';
import { UsersDataProvider } from '@/context/users.context';
import WrapperComponent from "@/components/wrapper";
import '../styles/global.css';
import { ToDoProvider } from '@/context/toDo.context';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <ToDoProvider>
        <AuthProvider>
          <NewUserProvider>
            <TokenProvider>
              <MenuDataProvider>
                <ClientsDataProvider>
                  <UsersDataProvider>
                    <OrderDataProvider>
                      <WrapperComponent>
                        <Component {...pageProps} />
                      </WrapperComponent>
                    </OrderDataProvider>
                  </UsersDataProvider>
                </ClientsDataProvider>
              </MenuDataProvider>
            </TokenProvider>
          </NewUserProvider>
        </AuthProvider>
      </ToDoProvider>
    </ApolloProvider>
  );
};

export default MyApp
