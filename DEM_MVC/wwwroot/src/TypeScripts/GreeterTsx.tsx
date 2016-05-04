import * as React from 'react';

export interface IGreeterTsxProps {
	greeting: string;
}

export default class GreeterTsx extends React.Component<IGreeterTsxProps, any> {
	render() {
		const { greeting } = this.props;
		return (
			<h1>{ greeting }</h1>
		);
	}
};