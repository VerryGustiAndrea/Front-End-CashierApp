const initialValue = {
    historyData: [],
    incomeData: [],
    errMsg: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  };
  
  const historyReducer = (state = initialValue, action) => {
    switch (action.type) {
      case "GET_ALL_HISTORY_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_ALL_HISTORY_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "GET_ALL_HISTORY_FULFILLED":
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          historyData: action.payload.data
        };


      case "GET_INCOME_PENDING":
        return {
          ...state,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_INCOME_REJECTED":
        return {
          ...state,
          isPending: false,
          isRejected: true,
          errMsg: action.payload.data
        };
      case "GET_INCOME_FULFILLED":
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          incomeData: action.payload.data
        };
      default:
        return state;
    }
  };
  
  export default historyReducer;
  