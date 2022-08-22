import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://leaderboardxot.herokuapp.com/graphql",
  fetchOptions: {
    mode: "cors",
  },
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: "no-cache", errorPolicy: "all" } },
});
