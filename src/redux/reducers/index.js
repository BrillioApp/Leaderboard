import { combineReducers } from "redux";
import eventReducer from "./EventReducer";
import userReducer from "./UserReducer";

export default combineReducers({
    eventReducer,
    userReducer
});