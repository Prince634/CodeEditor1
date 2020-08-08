import React, {useState} from 'react'
import Header from '../components/Header.js'
import useChatRooms from '../helpers/useManageRooms.js'


export default (props) =>{

	const[fname, setFname]= useState('')
	const[lname, setLname]= useState('')
	const[email, setEmail]= useState('')
	const[room, setRoomData]= useState({})

	const addedUser = useChatRooms(room)

	var addRoom = ()=>{
		setRoomData({'roomId':lname, 'roomData': {fname, lname, email} })
	}
	var startChat = ()=>{
		props.history.push(`/chat?name=${fname}`);
	}	

	return(

		<div className="container">
			<Header {...props}/>
			<div className="box">
				<h1 className="heading">Sign Up</h1>
				<p className="hd-txt">It's free and only takes a minute</p>
				<div className="blck">
					<p>First Name</p>
					<input className="lbl" type="text" name="fname" onChange={(event)=>setFname(event.target.value)}/>	
				</div>
				<div className="blck">
					<p>Last Name</p>
					<input className="lbl" type="text" name="lname" onChange={(event)=>setLname(event.target.value)}/>	
				</div>
				<div className="blck">
					<p>Email</p>
					<input className="lbl" type="text" name="email" onChange={(event)=>setEmail(event.target.value)}/>	
				</div>
				<button className="btn" onClick={addRoom}>ADD ROOM</button>
				<button className="btn" onClick={startChat}>START CHAT</button>

				<div className="log-txt">By clicking you agree to the terms & conditions of the company.It agrees to the company </div>
			</div>
		</div>
		)
}