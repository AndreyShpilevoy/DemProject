//Context ussed here!
import React, {PropTypes} from 'react';
import {TermItem as TermItemComponent} from "../components/_all";
import {TermTranslation, ReduxContextFix} from "../utils/_all";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool
  };

  static contextTypes = {
    locale: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    ReduxContextFix.connect(this);
  }

  translate = () => {
      if(this.context.locale && this.props.term){
        return TermTranslation.getTermTranslation(this.props.term, this.context.locale);
      } else {
        return null;
      }
  }

  render(){
    let item = this.props;
    return(
      <TermItemComponent term={this.translate()} className={item.className} spaceBefore={item.spaceBefore} spaceAfter={item.spaceAfter}/>
    );
  }
}

export default TermItem;
