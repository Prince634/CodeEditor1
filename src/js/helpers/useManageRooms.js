import React, { useState, useEffect } from 'react';
import SOCKET from '../../../socket.js';


function useManageRooms(props){
	console.log('CHATtttttt');console.log(props);

	const[userRooms, setRoomId] = useState({});
	const[currentRoom, setCurrentRoom] = useState('')
	const[msg, saveMessage] = useState([])

	function addRoom(){
		let allRooms = {...userRooms};
		if(allRooms[props.roomId]) {

		}else{
			SOCKET.instance.emit('join', {fname: props.fname, msg: props.msg, roomId: props.roomId})
		}
		allRooms[props.roomId] = props.roomData
		setRoomId(allRooms)
		setCurrentRoom(props.roomId)
	}

	function removeRoom(){
		let allRooms = {...userRooms};
		if(allRooms[props.roomId]) {
			delete allRooms[props.roomId];
		}
		setRoomId(allRooms)
		setCurrentRoom('')
	}

	useEffect(()=>{
		if(props.roomId){
			console.log('Room added', props.roomId)
			addRoom();
		}else if(props.removeRoom) {
			console.log('room removed');
			removeRoom();
		}
	}, [props.roomId, props.removeRoom ])	

	useEffect(()=>{
		if(props.msg && props.roomId) {
			let curentRoomMsg = msg.filter(x=>x.roomId == props.roomId)
			curentRoomMsg.push({roomId: props.roomId, msg: props.msg, time: new Date(), fname: props.fname})
			//Send Messag To Socket
			SOCKET.sendMessageToRoom({roomId: props.roomId, msg: props.msg, time: new Date(), fname: props.fname });
			
			saveMessage(curentRoomMsg)
		}
	}, [props.msg, props.roomId])

	console.log("START USE STATE");
	console.log(userRooms);
	console.log(msg);
	console.log("END USE STATE");
	if(props.roomId && userRooms[props.roomId]){
		return {roomData: userRooms[props.roomId], currentRoom: currentRoom, msg: msg, fname: props.fname}
	}else {
		return null;
	}
}

export default useManageRooms;