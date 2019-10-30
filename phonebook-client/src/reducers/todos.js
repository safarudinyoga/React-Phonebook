import {
    LOAD_DATA_SUCCESS,
    LOAD_DATA_FAILURE,
    ADD_DATA,
    ADD_DATA_SUCCESS,
    ADD_DATA_FAILURE,
    DELETE_DATA,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAILURE,
    SEARCH_DATA,
    SEARCH_DATA_RESET
} from "../constants/actiontype"

// sort method in frontend
const compare = (a,b) => {
    if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
}

const todos = (state = [], action) => {

    switch (action.type) {

        case LOAD_DATA_SUCCESS:
            return action.todos.map((data) => ({
                ...data,
                sent: true,
                isVisible: true
            })).sort(compare)

        case ADD_DATA:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phonenumber: action.phonenumber,
                    sent: true,
                    isVisible: true
                }
            ].sort(compare)
        
        case ADD_DATA_SUCCESS:
            return state.map((data) => {
                data.sent = true;
                return data
            }).sort(compare)

        case DELETE_DATA:
            return state.filter((data) => data.id !== action.id)

        case SEARCH_DATA:
            return state.map((item) => ({
                ...item, 
                isVisible: (item.name.toLowerCase().includes(action.value) || item.phonenumber.includes(action.value))
            }))

        case SEARCH_DATA_RESET:
            return state.map((item) => ({
                ...item,
                isVisible: true
            }))
        
        case DELETE_DATA_SUCCESS:
        case DELETE_DATA_FAILURE:
        case ADD_DATA_FAILURE:
        case LOAD_DATA_FAILURE:
        default:
            return state
    }
}


export default todos