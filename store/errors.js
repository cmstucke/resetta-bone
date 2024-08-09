import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import {recordErrorsReducer} from './records';

export default combineReducers({
  session: sessionErrorsReducer,
  records: recordErrorsReducer
});