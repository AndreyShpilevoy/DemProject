import React, {PropTypes} from 'react';

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.string.isRequired
  };

  render(){
    return(
      <span>
        {this.props.term ? this.props.term : null}
      </span>
    );
  }
}

export default TermItem;
