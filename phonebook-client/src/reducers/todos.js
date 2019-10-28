const todos = (state = [], action) => {

    switch (action.type) {

        case 'LOAD_DATA_SUCCESS':
            return action.data.map((data) => {
                // data.sent = true;
                return data
            })
        default:
            return state
    }
}


export default todos