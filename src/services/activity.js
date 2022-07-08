import { client } from "services/Client";
import { gql } from "@apollo/client";

export const getActivities = async () => {
  const res = await client.query({
    query: gql`
      query {
        getActivities {
          id
          name
          ranks {
            position
            points
          }
        }
      }
    `,
  });
  return res.data.getActivities;
};

export const createActivity = async (data) => {
  let name = data.name;
  let rankList = data.ranks;
  return client
    .mutate({
      mutation: gql`
        mutation ($name: String!, $ranks: [RankInput]!) {
          createActivity(name: $name, ranks: $ranks) {
            id
            name
            ranks {
              position
              points
            }
          }
        }
      `,
      variables: {
        name: name,
        ranks: rankList,
      },
    })
    .then((res) => {
      return res.data.createActivity;
    });
};
