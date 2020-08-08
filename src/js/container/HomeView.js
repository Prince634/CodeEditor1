import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'
import Socket from '../../../socket.js'

class Home extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			textValue:''
		}
	}

	static loadData(store){
		return Promise.resolve()
	}

	componentDidMount(){
		if(Socket && Socket.instance) {
			Socket.sendMessageToRoom({roomId: '12', message: ''});
			Socket.instance.on('roomMessage', (data)=>{
				this.setState({ textValue: data.message })
			})
		}else {
			Socket.init((cb)=>{
				Socket.sendMessageToRoom({roomId: '12', message: ''});
				Socket.instance.on('roomMessage', (data)=>{
					this.setState({ textValue: data.message })
				})
			})
		}
	}

	dataChange = (e) =>{
		if(Socket.instance) {
			Socket.sendMessageToRoom({roomId: '12', message: e.target.value});
		}else {
			Socket.init((cb)=>{
				Socket.sendMessageToRoom({roomId: '12', message: e.target.value});
			})
		}
		this.setState({ textValue: e.target.value })
	}

	render(){
		
		return(

			<React.Fragment>
				<Header {...this.props}/>
				<textarea className="edit-blck" rows="50" value={this.state.textValue} onChange={(e)=>this.dataChange(e)}/>
			</React.Fragment>
			)
	}
}

const mapStateToProps = (state)=>{
	return {
		USER:state.USER
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)