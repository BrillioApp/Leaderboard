import {
  ADD_USER,
  RETRIEVE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "redux/actionTypes/UserActionTypes";

export const addUserAction = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const retrieveUserAction = (user) => ({
  type: RETRIEVE_USER,
  payload: user,
});

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUserAction = (id) => ({
  type: DELETE_USER,
  payload: { id },
});
