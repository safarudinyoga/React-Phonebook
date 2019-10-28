import axios from 'axios'

const API_URL = 'http://localhost:3001/api/'

const request = axios.create({
    baseURL: API_URL,
    timeout: 1000
});

// start load itemlist data
const loadDataSuccess = (data) => {
    return { type: 'LOAD_DATA_SUCCESS', data }
}

const loadDataFailure = () => {
    return {type: 'LOAD_DATA_FAILURE'}
}

export const LoadData = () => {
    return dispatch => {
        return request.get('phonebook')
            .then((response) => {
                console.log(response);
                dispatch(loadDataSuccess(response.data))
            })
            .catch((error) => {
                console.error(error);
                dispatch(loadDataFailure())
            });
    }
}

// end load comment data
