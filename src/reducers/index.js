import { combineReducers } from "redux";
import latestNews from "../reducers/LatestDataReducer";


const rootReducer = combineReducers({
  latestNews,
});

export default rootReducer;
