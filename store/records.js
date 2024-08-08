// import { createSlice } from '@reduxjs/toolkit';
import jwtFetch from './jwt';

const RECEIVE_RECORD = "records/RECEIVE_RECORD";
// const UPDATE_RECORD = "records/UPDATE_RECORD";
const RECEIVE_RECORD_ERRORS = "records/RECEIVE_RECORD_ERRORS";
const CLEAR_RECORD_ERRORS = "records/CLEAR_RECORD_ERRORS";

const receiveRecord = (record) => ({
  type: RECEIVE_RECORD,
  payload: { record }
});
const receiveErrors = errors => ({
  type: RECEIVE_RECORD_ERRORS,
  errors
});

export const clearRecordErrors = errors => ({
    type: CLEAR_RECORD_ERRORS,
    errors
});

export const fetchCurrentUserRecord = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/records');
    const record = await res.json();
    dispatch(receiveRecord(record));
  } catch (error) {
    console.log('err', error)
    const resBody = await error.json();
    if (resBody.statusCode === 400){
      dispatch(receiveErrors(resBody));
    }
  }
}
export const fetchRecord = (userId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/records/${userId}`)
    const record = await res.json();
    dispatch(receiveRecord(record));
  } catch (error) {
    const resBody = await error.json();
    if (resBody.statusCode === 400){
      dispatch(receiveErrors(resBody));
    }
  }
}

const initialState = {};

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECORD:
      const { record } = action.payload;
      return {...state,[record.user._id]: record}
    default:
      return state;
  }
};

const nullErrors = null;

export const recordErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_RECORD_ERRORS:
      return action.errors;
    case CLEAR_RECORD_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

export default recordReducer;
