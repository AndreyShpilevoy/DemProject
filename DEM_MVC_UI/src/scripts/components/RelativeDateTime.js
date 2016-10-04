import React, {PropTypes} from 'react';

class RelativeDateTime extends React.Component {
  static propTypes = {
      relativeDateTime: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaceBeforeTerm: this.props.spaceBefore ? " " : "",
      termClassName: this.props.className ? `relativeDateTime ${this.props.className }`: 'relativeDateTime',
      spaceAfterTerm: this.props.spaceAfter ? " " : "",
    };
  }

  render(){
    return this.props.relativeDateTime ?
      <span className={this.state.termClassName}>
        {`${this.state.spaceBeforeTerm}${this.props.relativeDateTime}${this.state.spaceAfterTerm}`}
      </span> :
      null;
  }
}

export default RelativeDateTime;
