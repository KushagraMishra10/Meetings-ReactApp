import { combineReducers } from "redux";
import meetingsReducer from "./meetingsReducer";

export default combineReducers({
  meetingsReducer: meetingsReducer
});
