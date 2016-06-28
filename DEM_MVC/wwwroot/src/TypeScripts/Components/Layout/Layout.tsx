import * as React from "react";

export interface ILayout { compiler: string; framework: string; }

export class Layout extends React.Component<ILayout, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}