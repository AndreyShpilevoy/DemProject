import React, {PropTypes} from "react";
import Header from "./Common/Header";

class Layout extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.object.isRequired
};

export default Layout;
