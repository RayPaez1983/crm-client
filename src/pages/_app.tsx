import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import {AuthProvider} from "../context/sign-in.context"
import {NewUserProvider} from "../context/sign-up.context"
import {TokenProvider} from "../context/token.context"
import WrapperComponent from "@/components/wrapper";
import '../styles/global.css'

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NewUserProvider>
          <TokenProvider>
          <WrapperComponent>
            <Component {...pageProps} />
          </WrapperComponent>
          </TokenProvider>
        </NewUserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp
