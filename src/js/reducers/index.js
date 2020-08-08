import { combineReducers } from 'redux'
import USER from './user.js'
import { reducer as formReducer } from 'redux-form'
const allReducers = combineReducers({
	USER:USER,
	form: formReducer
})

export default allReducers
