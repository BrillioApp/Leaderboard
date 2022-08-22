import { client } from "services/Client";
import { gql } from "@apollo/client";

export const creatLog = async (date, userId, description ) => {
  const res = await client.mutate({
    mutation: gql`
    mutation{
        createLogData(date:"${date}",userId:"${userId}", description:"${description}"){
          id
          date
          userId
          description
        }
      }
    `,
  });
  return res.data.createLogData;
};