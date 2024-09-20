import jwtFetch from './jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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
  const { image, username, password, email } = userInfo;
  // const formData = new FormData();
  // formData.append("username", username);
  // formData.append("password", password);
  // formData.append("email", email);
  
  // if (image) formData.append("image", image);
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
      // body: formData
    });
    
    const { user, token } = await res.json();
    if(Platform.OS === 'web'){
      localStorage.setItem('jwtToken', token);
    } else {
      await AsyncStorage.setItem('jwtToken', token);
      // await SecureStore.setItemAsync('jwtToken', token);

    }
    return dispatch(receiveCurrentUser(user));
  } catch(err) {
    console.log("!!!", err)
    const res = await err.json();
    console.log(("err.json error", res))
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => async dispatch => {
  if(Platform.OS === 'web'){
    localStorage.removeItem('jwtToken');
  } else {
    await AsyncStorage.removeItem('jwtToken');
    // await SecureStore.deleteItemAsync('jwtToken');
  }
  
  
  dispatch(logoutUser());
};

export const getCurrentUser = () => async dispatch => {
  try{
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
  }catch(err){
    console.log(err)
  }
};

export const updateCurrentUserScannedRecords = (userId) => async dispatch => {
  try{
    const res = await jwtFetch(`/api/users/scan/${userId}`, {
      method: 'PATCH'
    });
    const user = await res.json();
    return dispatch(receiveCurrentUser(user))
  }catch(err){
    console.log(err)
  }
}

const initialState = {
  user: null
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