import { client } from "services/Client";
import { gql } from "@apollo/client";

export const addEvent = async ({ activityId, date, organizer }) => {
  const res = await client.mutate({
    mutation: gql`
    mutation{
        createEvent(activityId:"${activityId}",date: ${Date.parse(
      date
    )}, organizer:"${organizer}"){
          id
          activityId{
            id
            name
          }
          organizer
          date
        }
      }
    `,
  });
  return res.data.createEvent;
};

export const getEvents = async () => {
  // console.log(`Fetching events`);
  const res = await client.query({
    query: gql`
      query {
        getEvents {
          id
          activityId {
            id
            name
            ranks {
              points
              position
            }
          }
          organizer
          date
        }
      }
    `,
  });
  // console.log(`Events:`);
  // console.log(res.data.getEvents);
  return res.data.getEvents;
};

export const updateEvent = async ({ id, organizer, date }) => {
  const res = await client.mutate({
    mutation: gql`
      mutation{
        updateEvent(id:"${id}", organizer:"${organizer}", date: ${Date.parse(
      date
    )}){
          id
          activityId{
            id
            name
          }
          organizer
          date
        }
      }
    `,
  });
  return res.data.updateEvent;
};

export const deleteEvent = async ({ id }) => {
  const res = await client.mutate({
    mutation: gql`
    mutation{
      deleteEvent(id:"${id}"){
        id
        activityId{
          id
          name
        }
        organizer
        date
      }
    }
    `,
  });
  return res.data.deleteEvent;
};

// points
