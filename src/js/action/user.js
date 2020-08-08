import { LOAD_INITIAL_DATA, LOAD_SSR_INITIAL_DATA, SELECT_LOCATION, SAVE_USER_CITY } from '../helpers/type.js'
import { API_GET, API_POST } from './api.js'

export const getInitialData = () => (dispatch) => {
	return API_GET('https://react-ssr-api.herokuapp.com/users').then((resp)=>{
		dispatch({
			type: LOAD_INITIAL_DATA,
			payload: resp
		})	
	})
	
} 

export const getServerInitialData = () => (dispatch) => {
	dispatch({
			type: LOAD_SSR_INITIAL_DATA
		})
	
}

export const getGeoIPLocation = () => (dispatch) => {
	
	API_POST('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWTEhDOgNqy_slfhFrk7fanPCPZK9O1Vs', {}).then((resp)=>{
		console.log(resp)
		dispatch({

		})
	})
}

export const findPlaces = (searchString='', cb) => (dispatch) => {
	
	return API_GET(`http://localhost:4001/searchPlace?searchString=${searchString}`).then((resp)=>{
		if(cb)cb(resp)	
	})
}

export const selectLocation = (city) => (dispatch) => {
	dispatch({
		type: SELECT_LOCATION,
		payload: city
	})
}

export const getAllCities = (cb) => (dispatch) => {
	return API_GET(`https://docprime.com/api/v1/diagnostic/allmatrixcities`).then((resp)=>{
		if(cb)cb(resp)
	}).catch((e)=>{

	})
}

export const saveUserCity = (data) => (dispatch) => {
	dispatch({
		type: SAVE_USER_CITY,
		payload: data
	})
}