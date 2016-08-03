import React, {PropTypes} from "react";
import Header from "./common/presentation/Header";

const Layout = ({children}) => {
		return (
			<div>
				<Header/>
				{children}
			</div>
		);
};

Layout.propTypes = {
	children: PropTypes.object.isRequired
};

export default Layout;
