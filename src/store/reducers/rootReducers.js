import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from './dashboard';
import profile from "./profile";
import movies from './movie';
export default combineReducers({
    auth,
    dashboard,
    profile,
    movies,
})