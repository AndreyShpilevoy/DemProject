import React, {PropTypes} from 'react';

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaceBeforeTerm: this.props.spaceBefore ? " " : "",
      termClassName: this.props.className ? `term ${this.props.className }`: 'term',
      spaceAfterTerm: this.props.spaceAfter ? " " : "",
    };
  }

  render(){
    if(this.props.term){
      return(
        <span className={this.state.termClassName}>
          {`${this.state.spaceBeforeTerm}${this.props.term}${this.state.spaceAfterTerm}`}
        </span>
      );
    } else {
      return null;
    }
  }
}

export default TermItem;
