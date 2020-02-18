

const initialValue = {
  number: 0
};

function countReducer(state = initialValue, action) {
  switch (action.type) {
    case "COUNT_ADD":
      return {
        ...state,
        number: state.number + action.payload
      };
    case "COUNT_SUBTRACT":
      return {
        ...state,
        number: state.number - action.payload
      };
    default:
      return state;
  }
  //   if (action.type === "COUNT_ADD") {
  //     return {
  //       ...state,
  //       number: number + action.payload
  //     };
  //   }
  // };

  // if (action.type === "COUNT_ADD") {
  //     return {
  //       ...state,
  //       number: number + action.payload
  //     };
  //   }
}

export default countReducer;
