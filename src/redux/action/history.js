import Axios from "axios";

export const getAllHistory = ()=>{
  return {
    type: "GET_ALL_HISTORY", // string yang mendiskripsikan perintah
    payload: Axios.get(process.env.REACT_APP_URL_GET_HISTORY)
    
  };
};

export const getIncome = ()=>{
  return {
    type: "GET_INCOME", // string yang mendiskripsikan perintah
    payload: Axios.get(process.env.REACT_APP_URL_INCOME)
    
  };
};

// export const postNewUser = name => {
//   return {
//     type: "POST_USER",
//     payload: Axios.post(process.env.REACT_APP_URL_STRING, {
//       username: name
//     })
//   };
// };
