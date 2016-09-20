import React, {PropTypes} from 'react';
import {TermTranslation} from "../reactLess/_all.js";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      locale: PropTypes.string.isRequired
  };

  translate = () => (
    TermTranslation.getTermTranslation(this.props.term, this.props.locale)
  );

  render(){
    return(
      <span>{this.translate()}</span>
    );
  }
}

export default TermItem;
