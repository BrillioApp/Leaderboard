import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  fetchOptions: {
    mode: "cors",
  },
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: "no-cache", errorPolicy: "all" } },
});
