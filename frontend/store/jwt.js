import config from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
  }
  
  
async function jwtFetch(url, options = {}) {
    // Set options.method to 'GET' if there is no method.
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
      // Set the "Authorization" header to the value of "jwtToken" in localStorage.
      let jwtToken;
      if(Platform.OS === 'web'){
        jwtToken = localStorage.getItem('jwtToken');
      } else {
        jwtToken = await AsyncStorage.getItem('jwtToken');
      }
      if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;
    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json".
    if (options.method.toUpperCase() !== "GET") {
      if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
      }
      // options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN"); 
    }
  
    // Call fetch with the url and the updated options hash.
    // const res = await fetch(`http://localhost:5001${url}`, options);

    // const res = await fetch(`${config.apiUrl}${url}`, options);
    const res = await fetch(`https://resetta-bone-7e685f0cd81d.herokuapp.com${url}`, options);

    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
}
  
  export default jwtFetch;