export const COLOR = '@ui/menu/color'
export const VISIBILITY = '@ui/menu/hidden'

const initialState = {
    color: 'dark',
    hidden: false,
}

export const setVisibility = (status) => (dispatch) => {
    return dispatch({
        type: VISIBILITY,
        payload: status
    })
}


export const setMenuColor = (color) => (dispatch) => {
    return dispatch({
        type: COLOR,
        payload: color
    })
}


export default function menu(state = initialState, action) {
    switch (action.type) {
        case COLOR:
            return {...state, color: action.payload}
        case VISIBILITY:
            return {...state, hidden: action.payload}
        default:
            return state
    }
}

