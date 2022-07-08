import { client } from "services/Client";
import { gql } from "@apollo/client";

export const getAdminList = () => {
  return client
    .query({
      query: gql`
        query {
          getAllAdminCreds {
            id
            username
            password
            isAdmin
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getAllAdminCreds;
    });
};
export const getAdminFlag = (userId) => {
  return client
    .query({
      query: gql`
        query {
          getAdminCred(id:"${userId}") {
            isAdmin
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getAdminCred;
    });
};

export const getAdmin = (username, password) => {
  return client
    .query({
      query: gql`
        query {
          validateLogin(username: "${username}",password:"${password}") {
            id
            username
            password
          
          }
        }
      `,
    })
    .then((res) => {
      return res.data.validateLogin;
    });
};
