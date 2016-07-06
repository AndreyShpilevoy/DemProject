import React, {PropTypes} from "react";

class Layout extends React.Component {
	render() {
		return (
			<div>
				<p>Header</p>
				{this.props.children}
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.object.isRequired
};

export default Layout;
