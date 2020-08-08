import { LOAD_INITIAL_DATA, LOAD_SSR_INITIAL_DATA, SELECT_LOCATION, SAVE_USER_CITY } from '../helpers/type.js'

const defaultState = {
	user_list: [],
	loadedSSR:false,
	selectedLocation: {},
	selectedCity: ''
}

export default function (state = defaultState, action){

	switch(action.type){

		case 'LOAD_INITIAL_DATA' : {
			let newState = {
				...state
			}
			newState.user_list = action.payload
			return newState
		}

		case 'LOAD_SSR_INITIAL_DATA': {
			let newState = {
				...state
			}
			newState.loadedSSR = true
			return newState
		}

		case 'SELECT_LOCATION' : {
			let newState = {
				...state
			}

			newState.selectedLocation = action.payload
			return newState
		}

		case SAVE_USER_CITY: {
			let newState = {
				...state
			}
			newState.selectedCity = action.payload
			return newState
		}
		default: return state
	}
	return state
}