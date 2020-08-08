import React from 'react'
import { connect } from 'react-redux'
import  Actions from '../action/index.js'
import HelmetTags from '../helpers/HelmetTags.js'
import Header from '../components/Header.js'
import ChatView from '../components/ChatView.js'

class Chat extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			selectedRoom:''
		}
	}

	static loadData(store){
		return store.dispatch(Actions.getInitialData())
	}

	componentDidMount(){
		
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	getSelectedChat = (e)=>{
		console.log(e.target.value);
		this.setState({selectedRoom: e.target.value})
	}

	render(){
		
		return(

			<React.Fragment>
				<Header {...this.props}/>
				<HelmetTags title ="Gym House | Hub of all Gym's Near You With Best Offers Applicable" description="Gym House is collaboration of all local gym available.We Provide you best offers on your nearby gym with Personal Fitness Trainer & Diet Plans prepared by certified Gym Trainers."/>
				<select onChange={this.getSelectedChat}>
					<option value="doctor">Doctor</option>
					<option value="admin">Admin</option>
				</select>
				<ChatView {...this.props} />
				
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
		getInitialData:()=>dispatch(Actions.getInitialData()),
		getGeoIPLocation: ()=>dispatch(Actions.getGeoIPLocation()),
		findPlaces: (value, cb) => dispatch(Actions.findPlaces(value, cb)),
		selectLocation: (city) => dispatch(Actions.selectLocation(city))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
