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
    SEARCH_DATA_SUCCESS,
    SEARCH_DATA_FAILURE,
    SEARCH_DATA_RESET
} from "../constants/actiontype"

import axios from 'axios'

const API_URL = 'http://localhost:3001/api/'

const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
});

// start load itemlist data
const loadDataSuccess = (todos) => {
    return { type: LOAD_DATA_SUCCESS, todos }
}

const loadDataFailure = () => {
    return { type: LOAD_DATA_FAILURE }
}

export const LoadData = () => {
    return dispatch => {
        return request.get('phonebook')
            .then((response) => {
                console.log(response);
                dispatch(loadDataSuccess(response.data.data))
            })
            .catch((error) => {
                console.error(error);
                dispatch(loadDataFailure())
            });
    }
}

// end load itemList data

// start add data

export const addDataSuccess = () => ({
    type: ADD_DATA_SUCCESS
})

export const addDataFailure = (id) => ({
    type: ADD_DATA_FAILURE,
    id
})

const addDataRedux = (id, name, phonenumber) => ({
    type: ADD_DATA, id, name, phonenumber
})

export const addData = (name, phonenumber) => {
    let id = Date.now();
    return dispatch => {
        dispatch(addDataRedux(id, name, phonenumber))
        return request.post('phonebook', { id, name, phonenumber })
            .then((response) => {
                dispatch(addDataSuccess(response.data.itemAdded))
            })
            .catch((error) => {
                console.error(error);
                dispatch(addDataFailure(id))
            });
    }
}

// end add data

// start delete data

const deleteDataRedux = (id) => ({
    type: DELETE_DATA, id
})

export const deleteDataSuccess = (todos) => ({
    type: DELETE_DATA_SUCCESS,
    todos
})

export const deleteDataFailure = () => ({
    type: DELETE_DATA_FAILURE
})

export const deleteData = (id) => {
    return dispatch => {
        dispatch(deleteDataRedux(id))
        return request.delete(`phonebook/${id}`)
            .then((response) => {
                dispatch(deleteDataSuccess(response.data.itemDeleted))
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteDataFailure())
            });
    }
}

// End delete data

// Start Search data

export const searchData = (value) => ({
    type: SEARCH_DATA, 
    value: value.trim()
})

export const searchDataReset = () => ({
    type: SEARCH_DATA_RESET
})

// End Search data

// Start Resend data

// export const resendStore = (id, name, phone) => {
//     return dispatch => {
//         return axios.post('http://localhost:3001/api/phonebook', { id, name, phone })
//             .then(response => {
//                 dispatch(postDataSuccess(response.data))
//             })
//             .catch((err) => {
//                 console.log(err);
//                 dispatch(postDataFailure(id))
//             })
//     }
// }

// End resend data