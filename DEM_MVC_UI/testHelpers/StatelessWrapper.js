import React, {PropTypes} from "react";

export default class StatelessWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render() {
      return (
          <div>{this.props.children}</div>
      );
  }
}
