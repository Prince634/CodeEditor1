const socket = {

	instance: null,
	initialize: null,

	init:(cb)=>{
		if(typeof io=="function"){

			if(!socket.instance) {
				socket.instance = io();	
			}
			cb();
		}
	},
	clicked: ()=>{
		socket.instance.emit('increment');
	},
	sendMessageToRoom(dataParams={}) {
		socket.instance.emit('join', dataParams)
	}
}
export default socket
