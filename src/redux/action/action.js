// const add = {};

export const countAdd = addBy => {
  return {
    type: "COUNT_ADD", //string yang mendeskripsikan perintah
    payload: addBy //variabel yang dibawa ke reducer
  };
};


export const countSubtract = subtractBy => {
    return {
      type: "COUNT_SUBTRACT", //string yang mendeskripsikan perintah
      payload: subtractBy //variabel yang dibawa ke reducer
    };
  };


  