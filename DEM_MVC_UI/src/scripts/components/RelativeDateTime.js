import React, {PropTypes} from 'react';

class RelativeDateTime extends React.Component {
  static propTypes = {
      relativeDateTime: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  render(){
    return(
      <span className={this.props.className ? `relativeDateTime ${this.props.className }`: 'relativeDateTime'}>
        {this.props.spaceBefore ? " " : ""}
        {this.props.relativeDateTime ? this.props.relativeDateTime : null}
        {this.props.spaceAfter ? " " : ""}
      </span>
    );
  }
}

export default RelativeDateTime;
