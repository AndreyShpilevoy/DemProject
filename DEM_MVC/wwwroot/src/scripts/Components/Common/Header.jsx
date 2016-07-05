import React from "react";

const Header = (props) => {
	return (
		<h1>Hello from {props.compiler} and {props.framework}!</h1>
	);
};

export default Header;