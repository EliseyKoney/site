import axios from 'axios'

export const USERS_LOADED = '@ssr/users/loaded'

const initialState = {
    items: []
}

export const fetchUsers = () => (dispatch) => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            return res.data
        })
        .then(users => {
            dispatch({
                type: USERS_LOADED,
                items: users
            })
        }).catch(e => {
            console.error(e)
            dispatch({
                type: USERS_LOADED,
                items: []
            })
        })
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USERS_LOADED:
            return Object.assign({}, state, {items: action.items})
        default:
            return state
    }
}

