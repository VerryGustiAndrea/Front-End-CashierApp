// import { state } from "react-dom/test-utils"

const initialValue = {
    userData : []
}

const usersReducer = (state = initialValue, action) =>{

        switch (action.type) {
            case 'GET__USER':
                return {
                    ...state,
                    userData : action.payload
                }
            default:
                return state
        }
}


export default usersReducer;