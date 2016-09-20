import React, {PropTypes} from 'react';

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  render(){
    return(
      <span className={this.props.className ? `term ${this.props.className }`: 'term'}>
        {this.props.spaceBefore ? " " : ""}
        {this.props.term ? this.props.term : null}
        {this.props.spaceAfter ? " " : ""}
      </span>
    );
  }
}

export default TermItem;
