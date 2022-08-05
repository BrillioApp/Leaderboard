import { client } from "services/Client";
import { gql } from "@apollo/client";

export const getParticipantList = async () => {
  return await client
    .query({
      query: gql`
        query {
          getAllParticipants {
            id
            firstname
            lastname
            departmentId
            employeeId
            designation
            email
            phone
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getAllParticipants;
    });
};

export const createPartcipant = async (
  firstname,
  lastname,
  departmentId,
  employeeId,
  designation,
  email,
  phone
) => {
  return client
    .mutate({
      mutation: gql`
  mutation{
    createParticipant(firstname:"${firstname}",lastname:"${lastname}", departmentId:"${departmentId}", employeeId:"${employeeId}",designation:"${designation}",email:"${email}",phone:"${phone}"){
        id,
        firstname,
        lastname,
        departmentId,
        employeeId,
        designation,
        email,
        phone
      }
    }
  `,
    })
    .then((res) => {
      return res.data.createParticipant;
    });
};

export const updatePartcipant = async (
  id,
  firstname,
  lastname,
  departmentId,
  employeeId,
  designation,
  email,
  phone
) => {
  return client
    .mutate({
      mutation: gql`
  mutation{
    updateParticipant(id:"${id}",firstname:"${firstname}",lastname:"${lastname}",employeeId:"${employeeId}",designation:"${designation}",email:"${email}",phone:"${phone}",departmentId:"${departmentId}"){
        id,
        firstname,
        lastname,
        departmentId,
        employeeId,
        designation,
        email,
        phone
      }
    }
  `,
    })
    .then((res) => {
      return res.data.updateParticipant;
    });
};

export const removeParticipant = async (id) => {
  return client
    .mutate({
      mutation: gql`
    mutation{
      removeParticipant(id:"${id}"){
        firstname
      }
    }
    `,
    })
    .then((result) => {
      return result;
    });
};

// create partcipation

export const createParticipation = async (
  participantId,
  eventId,
  points,
  date,
  description
) => {
  let pointsval = parseInt(points);

  return client
    .mutate({
      mutation: gql`
  mutation{
    createParticipation(participantId:"${participantId}",activityId:"${eventId}",points:${pointsval},participationDate:"${date}",participationDescription:"${description}"){
      id
      }
    }
  `,
    })
    .then((res) => {
      return res.data.createParticipation;
    });
};

export const getPartcipationsList = (username, password) => {
  return client
    .query({
      query: gql`
        query {
          getAllParticipations {
            id
            activityId
            participantId
            points
            participationDate
            participationDescription
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getAllParticipations;
    });
};

export const getPartcipation = (partcipantId) => {
  return client
    .query({
      query: gql`
        query {
          getParticipations(id:"${partcipantId}") {
            id
            activityId
            participantId
            points
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getParticipations;
    });
};

export const updateParticipationList = (
  id,
  participantId,
  eventId,
  points,
  date,
  description
) => {
  let pointVal = parseInt(points);
  return client
    .mutate({
      mutation: gql`
  mutation{
    updateParticipation(id:"${id}",participantId:"${participantId}",activityId:"${eventId}",points:${pointVal},participationDate:"${date}",participationDescription:"${description}"){
        id,
      
      }
    }
  `,
    })
    .then((res) => {
      return res.data.updateParticipation;
    });
};

export const deleteParticipation = async (id) => {
  return client
    .mutate({
      mutation: gql`
    mutation{
      deleteParticipation(id:"${id}"){
        id
      }
    }
    `,
    })
    .then((result) => {
      return result;
    });
};

export const getParticipantPoints = async () => {
  // console.log(`Fetching events`);
  const res = await client.query({
    query: gql`
      query {
        getPoints {
          name
          totalPoints
          departmentId
          activity {
            points
            activityName
            participationDate
            participationDescription
            __typename
          }
          __typename
        }
      }
    `,
  });
  // console.log(`Events:`);
  // console.log(res.data.getEvents);
  return res.data.getPoints;
};

export const getAllDepartments = async () => {
  // console.log(`Fetching events`);
  const res = await client.query({
    query: gql`
      query {
        getDepartments {
          id
          name
        }
      }
    `,
  });
  // console.log(`Events:`);
  // console.log(res.data.getEvents);
  return res.data.getDepartments;
};
