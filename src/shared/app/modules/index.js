import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import menu from './menu'

const reducers = combineReducers({
    router: routerReducer,
    users,
    menu,
})

export default reducers