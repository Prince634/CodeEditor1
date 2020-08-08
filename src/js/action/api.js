import Axios from 'axios'

export const API_GET = (url)=> {

	return new Promise((resolve, reject)=> {
		try{
			return Axios.get(url).then((response)=>{
				resolve(response.data)
			})
		}catch(e){
			console.log('error at api ', e)
		}
	})
}

export const API_POST = (url, postData)=> {

	return new Promise((resolve, reject)=> {
		return Axios.create({
			  baseURL: url,
			  timeout: 1000,
			  headers: {'X-Custom-Header': 'foobar','Accept-Encoding':'gzip'}
			}).then((response)=>{
				console.log(response);
				resolve(response.data);
			})


		// Axios.post(url, postData).then((response)=>{
		// 	resolve(response.data)
		// })
	})
}