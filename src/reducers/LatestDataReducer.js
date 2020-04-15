import { Alert, AsyncStorage } from "react-native";
import {
LATESTNEWSDATASUCCESS,
LATESTNEWSDATAERROR,
START_LOADING,
STOP_LOADING
} from "../actions/LatestDataActions";

const initialState = {
 latestData:{},
 error:{},
 isLoading:false,
 isLoading:false
  
};

const latestNews = (state = initialState, action) => {
  switch (action.type) {
    case LATESTNEWSDATASUCCESS:
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        latestData: action.latestData || { attributes: {} },
        errors: action.loggedIn 
      });

    case LATESTNEWSDATAERROR:
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        latestData: action.currentUser || { attributes: {} },
        errors: action.errors
      });
    default:
      return state;
  }
};

export const getLoggedIn = state => state.sessions.loggedIn;
export const getRedeemed = state => state.sessions.isRedeemed;
export const getCurrentUser = state => state.sessions.currentUser;

export default latestNews;
