import { client } from "services/Client";
import { gql } from "@apollo/client";

export const getUsers = () => {
  return client
    .query({
      query: gql`
        query {
          users {
            id
            fname
            lname
            emp_ID
            designation
            email
            score {
              points {
                totalPoints
              }
            }
            EventWisePoints {
              id,
              points,
              userID,
              eventID
            }
          }
        }
      `,
    })
    .then((result) => result.data.users);
};

export const deleteUser = (id) => {
  return client
    .mutate({
      mutation: gql`
    mutation{
      RemoveUser(id:"${id}"){
        fname
      }
    }
    `,
    })
    .then((result) => {
      return result.data;
    });
};
export const addUser = async (fname, lname, emp_ID, designation, email) => {
  return client
    .mutate({
      mutation: gql`
      mutation{
        CreateUser(fname: "${fname}",
            lname:"${lname}",
            emp_ID:"${emp_ID}",
            designation: "${designation}",
            email: "${email}"){
          id,
          fname,
          lname,
          emp_ID,
          designation,
          email

        }
      }
    
    `,
    })
    .then((res) => {
      return res.data.CreateUser;
    });
};

export const UpdateUser = async (id,fname, lname, emp_ID, designation, email) => {
  return client
    .mutate({
      mutation: gql`
      mutation{
        UpdateUser(
            id:"${id}"
            fname: "${fname}",
            lname:"${lname}",
            emp_ID:"${emp_ID}",
            designation: "${designation}",
            email: "${email}"){
          id,
          fname,
          lname,
          emp_ID,
          designation,
          email

        }
      }
    
    `,
    })
    .then((res) => {
      return res.data.UpdateUser;
    });
};
export const AddPoints = async (points ,userID,eventID) => {
  return client
    .mutate({
      mutation: gql`
      mutation{AddPoints(
        points:${points},
        userID: "${userID}",
        eventID:"${eventID}"
        )
        {
        id,
        points,
        userID,
        eventID
      }}
`,
    })
    .then((res) => {
      console.log(res.data.AddPoints.userID)
      return res.data.AddPoints;
    });
};
export const UpdatePoints = async (points ,userID,eventID) => {
  return client
    .mutate({
      mutation: gql`
      mutation{UpdatePoints(
        points:${points},
        userID: "${userID}",
        eventID:"${eventID}"
        )
        {
        id,
        points,
        userID,
        eventID
      }}
`,
    })
    .then((res) => {
      return res.data.UpdatePoints
    });
};

export const getUser = (id) => {console.log('get user', id)
  return client
  .mutate({
    mutation: gql`
  query{
    user(id:"${id}"){
      id
        fname
        lname
        emp_ID
        designation
        email
        score {
          points {
            totalPoints
          }
        }
        EventWisePoints {
          id,
          points,
          userID,
          eventID
        }    }
  }
  `,
  })
  .then((result) =>  result.data.user)
}