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
    SEARCH_DATA_RESET,
    EDIT_DATA,
    EDIT_DATA_SUCCESS,
    EDIT_DATA_FAILURE,
    EDIT_ON,
    EDIT_OFF
} from "../constants/actiontype"

// sort method in frontend
const compare = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
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
                isVisible: true,
                onEdit: false
            })).sort(compare)

        case ADD_DATA:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phonenumber: action.phonenumber,
                    sent: true,
                    isVisible: true,
                    onEdit: false
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

        case ADD_DATA_FAILURE:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    sent: false
                })
            }))

        case EDIT_ON:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && { onEdit: true })
            })).sort(compare)

        case EDIT_OFF:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && { onEdit: false })
            }))

        case EDIT_DATA:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    onEdit: false,
                    name: action.name,
                    phonenumber: action.phonenumber,
                    sent:true
                })
            })).sort(compare)

        case EDIT_DATA_SUCCESS:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    onEdit: false,
                    name: action.name,
                    phonenumber: action.phonenumber,
                    sent:true
                })
            })).sort(compare)

        case EDIT_DATA_FAILURE:
            return state.map(item => ({
                ...item,
                ...(item.id === action.id && {
                    onEdit: false,
                    sent: false
                })
            }))

        case DELETE_DATA_FAILURE:
        case DELETE_DATA_SUCCESS:
        case LOAD_DATA_FAILURE:
        default:
            return state
    }
}


export default todos