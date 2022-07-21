import { client } from "services/Client";
import { gql } from "@apollo/client";

export const getActivities = async () => {
  const res = await client.query({
    query: gql`
      query {
        getActivities {
          id
          name
          points
        }
      }
    `,
  });
  return res.data.getActivities;
};

export const createActivity = async (data) => {
  let name = data.name;
  let points = parseInt(data.points);
  return client
    .mutate({
      mutation: gql`
        mutation ($name: String!, $points: Int!) {
          createActivity(name: $name, points: $points) {
            id
            name
            points
          }
        }
      `,
      variables: {
        name: name,
        points: points,
      },
    })
    .then((res) => {
      return res.data.createActivity;
    });
};

export const updateActivity = async ({ id, name, points }) => {
  let pointsVal = parseInt(points);
  console.log(typeof pointsVal);
  const res = await client.mutate({
    mutation: gql`
      mutation{
        updateActivity(id:"${id}", name:"${name}", points: ${pointsVal}){
         id
         name
         points
        }
      }
    `,
  });
  return res.data.updateActivity;
};

export const deleteActivity = async ({ id }) => {
  const res = await client.mutate({
    mutation: gql`
    mutation{
      deleteActivity(id:"${id}"){
        id
       
      }
    }
    `,
  });
  return res.data.deleteActivity;
};
