import Axios from "axios";

export const getAllProduct = ()=>{
  return {
    type: "GET_ALL_PRODUCT", // string yang mendiskripsikan perintah
    payload: Axios.get(process.env.REACT_APP_URL_GET_PRODUCT)
    
  };
};

export const viewCart = ()=>{
  return {
    type: "VIEW_CART", // string yang mendiskripsikan perintah
    payload: Axios.get(`${process.env.REACT_APP_URL_VIEW_CART}/${localStorage.getItem('id_cashier')}`)
    
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
