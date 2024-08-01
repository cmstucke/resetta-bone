import config from "../config";

async function getCookie() {
    // console.log('COOKIE NAME:', cookieName);
    // const cookies = document.cookie.split(';');
    // console.log('DOCUMENT COOKIE:', cookies);
    // for (let cookie of cookies) {
    //     const [name, value] = cookie.split('=');
    //     if (name.trim() === cookieName) return value;
    // }
    // return null;
    const response = await fetch('http://localhost:5001/api/csrf/restore', {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('DATA:', data);
    return data;
  }
  
  
async function jwtFetch(url, options = {}) {
    // Set options.method to 'GET' if there is no method.
    console.log('OPTIONS ARG:', options);
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
      // Set the "Authorization" header to the value of "jwtToken" in localStorage.
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;
    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json".
    const csrfToken = await getCookie();
    if (options.method.toUpperCase() !== "GET") {
      if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
        options.headers["Content-Type"] = "application/json";
      }
      options.headers["CSRF-Token"] = csrfToken['CSRF-Token'];
      // console.log('CSRF TOKEN:', options.headers["CSRF-Token"]);
    }
    
    // Call fetch with the url and the updated options hash.
    // const res = await fetch(`http://localhost:5001${url}`, options);
    console.log('OPTIONS:', options);
    
    const res = await fetch(`${config.apiUrl}${url}`, options);
  
    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
}
  
  export default jwtFetch;