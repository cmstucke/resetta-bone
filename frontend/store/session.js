import jwtFetch from './jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, '/api/users/register');
export const login = user => startSession(user, '/api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  console.log('hello')
  const { image, username, password, email } = userInfo;
  const formData = new FormData();
  // formData.append("username", username);
  // formData.append("password", password);
  // formData.append("email", email);
  formData.append("password", '123456');
  formData.append("email", 'bob@bob.com');

  if (image) formData.append("image", image);
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      // body: JSON.stringify(userInfo)
      body: formData
    });
    const { user, token } = await res.json();
    if(navigator.userAgent){
      localStorage.setItem('jwtToken', token);
    } else {
      await AsyncStorage.setItem('jwtToken', token);
    }
    return dispatch(receiveCurrentUser(user));
  } catch(err) {
    console.log(err)
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => async dispatch => {
  if(navigator.userAgent){
    localStorage.removeItem('jwtToken');
  } else {
    await AsyncStorage.removeItem('jwtToken');
  }
  
  
  dispatch(logoutUser());
};

export const getCurrentUser = () => async dispatch => {
  // console.log('agent', navigator.userAgent)
  try{
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
  }catch(err){
    console.log(err)
  }
};

const initialState = {
  user: undefined
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;



const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};