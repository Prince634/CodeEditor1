import React from 'react'
import { Helmet } from 'react-helmet'

class HelmetTags extends React.Component {

	render(){

		let { title , description } = this.props
		return(
			<div>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content = {description}/>
				</Helmet>
			</div>
			)
	}
}

export default HelmetTags