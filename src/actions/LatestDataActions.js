import { AsyncStorage } from "react-native";
import callApi from "../util/apiCaller";

export const LATESTNEWSDATASUCCESS = "LATESTNEWSDATASUCCESS";
export const LATESTNEWSDATAERROR= "LATESTNEWSDATAERROR";
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";


function startLoading() {
  return {
    type: START_LOADING
  };
}
function stopLoading() {
  return {
    type: STOP_LOADING
  };
}

function getNews(res) {
  return {
    type: LATESTNEWSDATASUCCESS,
    cities: res.data
  };
}

function getNewsError(data) {
  return {
    type: LATESTNEWSDATAERROR,
    errors: data.errors || {}
  };
}


export function loginRequest() {
  return dispatch => {
    dispatch(startLoading());
    return callApi(`/everything?q=bitcoin&from=2020-04-01&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98`, "GET",).then(res => {
      dispatch(stopLoading());
      if (res && res.data) {
        dispatch(getNews(res));
      } else {
        dispatch(getNewsError(res.errors || "Invalid credentials"));
      }
    });
  };
}

