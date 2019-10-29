import {
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAILURE,
    ADD_DATA,
    ADD_DATA_SUCCESS,
    ADD_DATA_FAILURE,
    DELETE_DATA,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAILURE
} from "../constants/actiontype"

const todos = (state = [], action) => {

    switch (action.type) {

        case LOAD_DATA_SUCCESS:
            return action.todos.map((data) => {
                data.sent = true;
                return data
            })

        case ADD_DATA:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phonenumber: action.phonenumber,
                    sent: true
                }
            ]
        
        case ADD_DATA_SUCCESS:
            return action.todos.map((data) => {
                data.sent = true;
                return data
            })

        case DELETE_DATA:
            return state.filter((data) => data.id !== action.id)

        case DELETE_DATA_SUCCESS:
        case DELETE_DATA_FAILURE:
        case ADD_DATA_FAILURE:
        case LOAD_DATA_FAILURE:
        default:
            return state
    }
}


export default todos