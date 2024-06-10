import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import {AuthProvider} from "../context/sign-in.context"
import {NewUserProvider} from "../context/sign-up.context"
import {TokenProvider} from "../context/token.context"
import { MenuDataProvider } from '@/context/menu.context';
import { OrderDataProvider } from '@/context/orders.context';
import WrapperComponent from "@/components/wrapper";
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NewUserProvider>
          <TokenProvider>
            <MenuDataProvider>
              <OrderDataProvider>
                <WrapperComponent>
                  <Component {...pageProps} />
                </WrapperComponent>
              </OrderDataProvider>
            </MenuDataProvider>
          </TokenProvider>
        </NewUserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default MyApp
