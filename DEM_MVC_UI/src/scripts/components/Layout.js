import React, {PropTypes} from "react";
import Header from "./common/presentation/Header";

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
}

export default Layout;
