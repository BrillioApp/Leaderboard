import { ADD_EVENT, RETRIEVE_EVENTS, UPDATE_EVENT, DELETE_EVENT } from "redux/actionTypes/EventActionTypes";

export const addEventAction = (event) => ({
    type: ADD_EVENT,
    payload: event
})

export const retrieveEventsAction = (events) => ({
    type: RETRIEVE_EVENTS,
    payload: events
})

export const updateEventAction = (event) => ({
    type: UPDATE_EVENT,
    payload: event
})

export const deleteEventAction = (id) => ({
    type: DELETE_EVENT,
    payload: { id }
})