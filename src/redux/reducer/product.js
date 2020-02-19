const initialValue = {
    productData: [],
    cart:[],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const productReducer = (state = initialValue, action) => {
    switch (action.type) {
      case "GET_ALL_PRODUCT_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ALL_PRODUCT_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "GET_ALL_PRODUCT_FULFILLED":
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productData: action.payload.data
        };
      case "VIEW_CART_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "VIEW_CART_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "VIEW_CART_FULFILLED":
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          cart: action.payload.data
        };  
        
      case "POST_PRODUCT_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "POST_PRODUCT_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "POST_PRODUCT_FULFILLED":
        state.productData.push(action.payload.data.data);
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          productData: state.productData,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  