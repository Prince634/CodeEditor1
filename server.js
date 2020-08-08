require('dotenv').config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"


const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketio = require('socket.io');
import Main from './src/js/container/HomeView.js'
import React from 'react'
import  ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import Routes from './routes.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './src/js/reducers/index.js'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'
const fs = require('fs');
import Loadable from 'react-loadable';
//import stats from './public/assets-loadable.json';
const stats = JSON.parse(_readFileSync(`./dist/assets-loadable.json`))
import { getBundles } from 'react-loadable-ssr-addon';

/*************************************************SOCKET START****************************************************************/

var server = http.createServer(app);
const io = socketio(server);
let count = 0;


io.on('connection', (socket)=>{
	console.log('new connection socket');
	socket.emit('countUpdated', count);

	// socket.join('join', ({username, room})=>{
	// 	socket.emit('message');
	// 	//Will Emit to particular room
	// 	socket.broadcast.to(room).emit('message', 'msg');
	// 	//io.to(room).emit('message','msg')
	// })



	socket.broadcast.emit('emitBroadcast', 'message');//Emit to all connected socket except the current one who emit msg

	socket.on('increment', ()=>{
		console.log('count updated on server', count);
		count++;
		socket.broadcast.emit('countUpdated', count);//only to that particular socket
		//io.emit('countUpdated', count);//To all connected socket
	})

	socket.on('join', (dataParams) =>{

		socket.join(dataParams.roomId);
		console.log('JOIN');
		socket.broadcast.to(dataParams.roomId).emit('roomMessage', dataParams)
	})

	socket.on('disconnect', ()=>{
		io.emit('msg', 'user left');
	})





})

/*************************************************SOCKET END****************************************************************/


var files = fs.readdirSync('./dist')
var split_bundles = []
var css_files = []
for(var i =0; i<files.length;i++){
	if(files[i].includes('main')){
		split_bundles.push(`${files[i]}`)	
	}else if(files[i].includes('.css')){
		/*files[i].readFile(filename, 'utf-8', (err, data) => {
            
        })*/
        css_files.push(`${files[i]}`)
	}

}

function _readStyles() {
    return new Promise((resolve, reject) => {
       
            Promise.all(css_files).then((styleFilesData) => {
                resolve(styleFilesData)
            }).catch((e) => {
                reject(e)
            })
    })
}


app.set('view engine', 'ejs');
app.use(express.static('dist'));

app.use('/images',express.static('images'));
app.all('*', function(req, res) {

	//Read Css Async
_readStyles().then((styleFiles)=>{
	let css_files = styleFiles
	let store = createStore(reducers, {}, applyMiddleware(thunk))
	let route_matched = null
	let promise = []
	let matched_path = []
	let modules = []
	Routes.ROUTES.map((route)=>{
		const match = matchPath(req.path, route)
		if(match){
			matched_path.push(match)
		}
        
        if(match){

        	if(route.component.preload) {

        		promise.push(route.component.preload().then(r=>{
        			return r.default||r
        		}).then((c)=>{
        			if (c.loadData) {
                            return c.loadData(store)
                        }
                    return {}
        		}))
        	}else if(route.component && route.component.loadData && route.renderOnServer){
        		promise.push(route.component.loadData(store))	
        	}
        }
        
	})
	let server_render_data = []
	promise.push(server_render_data)
	//res.set('Cache-Control', 'public, max-age=31557600'); // one year


	Promise.all(promise).then(()=>{
		
		let context = {}
		let content = ReactDOMServer.renderToString(
				<Loadable.Capture report={moduleName => modules.push(moduleName)}>
					<Provider store = {store}>
						<StaticRouter context={context} location={req.url}>
							<Routes/>
						</StaticRouter>
					</Provider>
				</Loadable.Capture>)

		let helmet = Helmet.renderStatic()
		let bundles = getBundles(stats, modules)
		bundles = bundles.js?bundles.js:bundles
		console.log('SSR API Success')
		//res.send(getHtml(store, helmet, content))
		store = `${serialize(store.getState())}`
		res.render('index.ejs',{helmetTags: helmet, storeData: store, htmlContent: content, split_bundles: split_bundles, bundles: bundles, css_files: css_files })
	}).catch((e)=>{


		let context = {}
		let content = ReactDOMServer.renderToString(
				<Loadable.Capture report={moduleName => modules.push(moduleName)}>
					<Provider store = {store}>
						<StaticRouter context={context} location={req.url}>
							<Routes/>
						</StaticRouter>
					</Provider>
				</Loadable.Capture>)
		console.log('SSR API Fail')
		store = `${serialize(store.getState())}`
		let bundles = getBundles(stats, modules)

		res.render('index.ejs',{helmetTags: null, storeData: store, htmlContent: content, split_bundles : split_bundles, bundles: bundles, css_files: css_files })	

	})
	})
})

function getHtml(store, helmet, content){
	let html = 
       `<!doctype html> 
       <html>
               <head>
                       ${helmet.title.toString()}
                       ${helmet.meta.toString()}
               </head>
               <body>
                       <div id ="root">${content}</div>
                       <script>
                               window.INITIAL_STATE = ${serialize(store.getState())}
                       </script>
                       <script src="main.bundle.js"></script>
               </body>
       </html>`
    return html

}

function _readFileSync(filename) {
    return fs.readFileSync(filename, 'utf-8')
}

// Serve the files on port 3000.
Loadable.preloadAll().then(() => {
	server.listen(4005, function () {
	  console.log('Example app listening on port 4005!\n');
	})
})
