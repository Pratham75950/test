import _ from "underscore";
import { Alert, AsyncStorage } from "react-native";
import fetch from "isomorphic-fetch";
import Store from "../store";

export const API_URL = "https://newsapi.org/v2"; 


export default async function callApi(endpoint, method = "get", body) {
  const { dispatch, getState } = Store();
  dispatch({ type: "startLoading" });
  let payload = {
    method,
    headers: {
      "X-DP-AUTH-TOKEN": await AsyncStorage.getItem(`accessToken`),
      "Content-Type": "application/json"
    }
  };

  if (_.includes(["post", "put", "patch"], method)) {
    _.extend(payload, { body: JSON.stringify(body) });
  }

  dispatch({ type: "startLoading" });
  console.log(
    "the api call goes here: ",
    API_URL + "/" + endpoint + "," + JSON.stringify(payload)
  );

  return fetch(`${API_URL}/${endpoint}`, payload)
    .then(response => {
      dispatch({ type: "StopLoading" });
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      dispatch({ type: "StopLoading" });
      return { errors: { base: "Something went wrong" } };
    });
}
