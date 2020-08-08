import React from 'react'
import ReactDom from 'react-dom'
import App from '../App.js'
import Loadable from 'react-loadable';


Loadable.preloadReady().then(() => {
	ReactDom.hydrate(<App/>,document.getElementById('root'))
})