import * as React from "react";
import Header from "./Common/Header";

export interface IMyProps {
	name: string;
}
export interface IMyState { }

export class Layout extends React.Component<IMyProps, IMyState> {
	render() {
		return (
			<Header compiler="TypeScript" framework="React" />
			{this.props.children }
		);
	}
}