import {
    ADD_EVENT,
    RETRIEVE_EVENTS,
    UPDATE_EVENT,
    DELETE_EVENT,
  } from "../actionTypes/EventActionTypes";

  const initialState = [];

  const eventReducer = (events = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case ADD_EVENT:
        return [...events, payload];
      case RETRIEVE_EVENTS:
        return payload;
      case UPDATE_EVENT:
        return events.map((event) => {
          if (event.id === payload.id) {
            return {
              ...event,
              ...payload,
            };
          } else {
            return event;
          }
        });
      case DELETE_EVENT:
        return events.filter(({ id }) => id !== payload.id);
      default:
        return events;
    }
  };

  export default eventReducer;