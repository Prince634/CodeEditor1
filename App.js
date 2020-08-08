import React from 'react'
import Routes from './routes.js'
import { BrowserRouter } from 'react-router-dom'
//import './src/js/style.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './src/js/reducers/index.js'
import Style from './src/style.css'
import STORAGE from './src/js/helpers/storage.js'
import SOCKET from './socket.js';

class App extends React.Component{

	componentDidMount(){
		SOCKET.init(()=>{
			console.log('clent socket');
		});

		if(SOCKET && SOCKET.instance) {
			SOCKET.instance.on('countUpdated', (count)=>{
				console.log('updated on client', count);
			})
		}
	}

	render(){
		let middleWare = [thunk]
		const logger = createLogger()
		middleWare.push(logger)
		let store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(...middleWare))
		
		return(
				<Provider store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
				</Provider>
			)
	}
}

export default App