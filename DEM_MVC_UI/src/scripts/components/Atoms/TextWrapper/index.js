import React, {PropTypes} from 'react';

class TextWrapper extends React.Component {
  static propTypes = {
      spanContent: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaceBeforeTerm: this.props.spaceBefore ? ' ' : '',
      termClassName: this.props.className,
      spaceAfterTerm: this.props.spaceAfter ? ' ' : '',
    };
  }

  render(){
    return this.props.spanContent ?
      <span className={this.state.termClassName}>
        {`${this.state.spaceBeforeTerm}${this.props.spanContent}${this.state.spaceAfterTerm}`}
      </span> :
      null;
  }
}

export default TextWrapper;
