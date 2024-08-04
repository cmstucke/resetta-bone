import { API_URL } from '@env';
import Constants from "expo-constants";

// console.log(Constants.expoConfig?.hostUri)
// const uri =
//   Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':8080') ??
//   'yourapi.com';
// console.log(uri)

export default {
  apiUrl: API_URL,
};
