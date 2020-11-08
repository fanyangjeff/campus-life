import {createStore} from 'redux'
import {userReducer} from './reducers'
/*
const rootRuducer = combineReducers({
    userReducer
})
*/

const store = createStore(userReducer)

export default store