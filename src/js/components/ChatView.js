import React, { useState, useEffect } from 'react'
import SOCKET from '../../../socket.js';
import useChatRooms from '../helpers/useManageRooms.js'
const queryString = require('query-string');


function ChatView(props){

	const parsed = queryString.parse(props.location.search);
	const[msg, inputMsg] = useState('')
	const[sndMsg, sendMessage] = useState('')
	const[userName, setName] = useState(parsed.name)
	var chatData = useChatRooms({fname: userName, lname: "kumar", email: "princekumar7b@gmail.com", msg: sndMsg, roomId: "kumar", roomData:{ fname: parsed.name, lname: "kumar", email: "princekumar7b@gmail.com", msg: sndMsg, roomId: "kumar" }});

	var sendClicked = ()=>{
		setName(parsed.name);
		sendMessage(msg);
		inputMsg('');
	}

	useEffect(()=>{
		if(SOCKET && SOCKET.instance) {
			SOCKET.instance.on('roomMessage', (data)=>{
				console.log('EMIIIIIIIT');console.log(data);
				setName(data.fname);
				sendMessage(data.msg);
			})	
		}
	})
	

	var inputHandler = (event)=> {
		inputMsg(event.target.value);
	}

	var handleEnterPress = (event) => {
		if(event.key==='Enter') {
			sendClicked();
		}
	}
	console.log('cahtView main');
	console.log(chatData);
	return(
	<div className="chat-main">

		<div className="chat-content">
			{
				chatData && chatData.msg && chatData.msg.length?
				chatData.msg.map((x, id)=>{
					return <div key={id} className={x.fname==parsed.name?"chat-rght":"chat-lft"}>
						<p>{x.msg}</p>
					</div>
				})
				:''
			}
		</div>
		<div className="chat-input">
			<input className="chat-txt" type="text" value={msg} onChange={(e)=>inputHandler(e)} onKeyPress={(e)=>handleEnterPress(e)}/>
			<p className="crsr" onClick={sendClicked}>Send</p>
		</div>
	</div>
	)
}

export default ChatView