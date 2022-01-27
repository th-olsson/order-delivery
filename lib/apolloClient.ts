import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = process.env.NEXT_PUBLIC_GQL_ENDPOINT;

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: uri,
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;
