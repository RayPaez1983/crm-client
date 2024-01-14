import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import {AuthProvider} from "../context/sign-in.context"
import {NewUserProvider} from "../context/sign-up.context"
import {TokenProvider} from "../context/token.context"
import WrapperComponent from "@/components/wrapper";
import '../styles/global.css'
import { MenuDataProvider } from "@/context/getMenu.context";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NewUserProvider>
          <TokenProvider>
          <MenuDataProvider>
          <WrapperComponent>
            <Component {...pageProps} />
          </WrapperComponent>
          </MenuDataProvider>
          </TokenProvider>
        </NewUserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp
