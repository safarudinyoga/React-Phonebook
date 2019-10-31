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

import Swal from "sweetalert2";
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
                Swal.fire({
                    type: 'success',
                    title: `Contact Added`,
                    showConfirmButton: false,
                    timer: 1500
                })
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                return request.delete(`phonebook/${id}`).then((response) => {
                    Swal.fire({
                        type: 'success',
                        title: `Contact Name ${response.data.itemDeleted.name} Slain!!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(deleteDataRedux(id))
                    dispatch(deleteDataSuccess(response.data.itemDeleted))
                })
            } else {
                return request.delete(`phonebook/${id}`).then((response) => {
                    dispatch(deleteDataFailure())
                    Swal.fire({
                        title: 'Cancelled',
                        text: `Contact ${response.data.itemDeleted.name} is Forgiven!`,
                        type: 'error',
                        timer: 1500
                    })
                })
            }
        })
    }
}

// export const deleteData = (id) => {
//     return dispatch => {
//         dispatch(deleteDataRedux(id))
//         return request.delete(`phonebook/${id}`)
//             .then((response) => {
//                 dispatch(deleteDataSuccess(response.data.itemDeleted))
//             })
//             .catch((error) => {
//                 console.error(error);
//                 dispatch(deleteDataFailure())
//             });
//     }
// }

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

// start resend add data

export const resendData = (id, name, phonenumber) => {
    return dispatch => {
        dispatch(deleteDataRedux(id))
        dispatch(addData(name, phonenumber))
    }
}

// end resend data

// start edit data

const editDataSuccess = (todos) => ({
    type: EDIT_DATA_SUCCESS,
    todos 
})

const editDataFailure = (id, name, phonenumber) => ({
    type: EDIT_DATA_FAILURE, id, name, phonenumber
})

const editDataRedux = (id, name, phonenumber) => ({
    type: EDIT_DATA, id, name, phonenumber
})

export const editON = (id) => ({
    type: EDIT_ON, id
})

export const editOFF = (id) => ({
    type: EDIT_OFF, id
})

export const editData = (id, name, phonenumber) => {
    return dispatch => {
        dispatch(editDataRedux(id,name,phonenumber))
        return request.put(`phonebook/${id}`, {name, phonenumber})
        .then(response => {
            dispatch(editDataSuccess(response.data.dataEdited))
        }).catch(error => {
            console.log(error);
            dispatch(editDataFailure(id, name, phonenumber))
        })
    }
}

export const resendEditData = (id, name, phonenumber) => {
    return dispatch => {
        return request.put(`phonebook/${id}`, {name, phonenumber})
        .then(response => {
            dispatch(editDataSuccess(response.data.dataEdited))
        }).catch(error => {
            console.log(error);
            dispatch(editDataFailure(id))
        })
    }
}