import * as React from "react";

const Header = (props:any) => {
	return (
		<h1>Hello from {props.compiler} and {props.framework}!</h1>
	);
};

export default Header;