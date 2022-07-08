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
            employeeId
            department
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
  employeeId,
  designation,
  departmentValue,
  email,
  phone
) => {
  return client
    .mutate({
      mutation: gql`
  mutation{
    createParticipant(firstname:"${firstname}",lastname:"${lastname}",employeeId:"${employeeId}",department:"${departmentValue}",designation:"${designation}",email:"${email}",phone:"${phone}"){
        id,
        firstname,
        lastname,
        employeeId,
        designation,
        department,
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
  employeeId,
  designation,
  departmentValue,
  email,
  phone
) => {
  return client
    .mutate({
      mutation: gql`
  mutation{
    updateParticipant(id:"${id}",firstname:"${firstname}",lastname:"${lastname}",employeeId:"${employeeId}",department:"${departmentValue}",designation:"${designation}",email:"${email}",phone:"${phone}"){
        id,
        firstname,
        lastname,
        employeeId,
        designation,
        department,
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

export const createParticipation = async (participantId, eventId, rank) => {
  let position = parseInt(rank);
  console.log(typeof position);
  return client
    .mutate({
      mutation: gql`
  mutation{
    createParticipation(participantId:"${participantId}",eventId:"${eventId}",rank:${position}){
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
            eventId
            participantId
            rank
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
            eventId
            participantId
            rank
          }
        }
      `,
    })
    .then((res) => {
      return res.data.getParticipations;
    });
};

export const updateParticipationList = (id, participantId, eventId, rank) => {
  let position = parseInt(rank);
  return client
    .mutate({
      mutation: gql`
  mutation{
    updateParticipation(id:"${id}",participantId:"${participantId}",eventId:"${eventId}",rank:${position}){
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
          event {
            rank
            points
            eventId
            activityName
          }
        }
      }
    `,
  });
  // console.log(`Events:`);
  // console.log(res.data.getEvents);
  return res.data.getPoints;
};
