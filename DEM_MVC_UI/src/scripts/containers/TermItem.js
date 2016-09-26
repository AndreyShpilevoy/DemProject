import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {TermItem as TermItemComponent} from "../components/_all";
import {TermTranslation} from "../utils/_all";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
      locale: PropTypes.object.isRequired
  };

  translate = () => {
      if(this.props.locale && this.props.term){
        return TermTranslation.getTermTranslation(this.props.term, this.props.locale);
      } else {
        return null;
      }
  }

  render(){
    let item = this.props;
    return(
      <TermItemComponent
        term={this.translate()}
        className={item.className}
        spaceBefore={item.spaceBefore}
        spaceAfter={item.spaceAfter}/>
    );
  }
}


const mapStateToProps = (state) => {
  let result = {};
  if(state.localeReducer.currentLocale && state.localeReducer.currentLocale.locale){
    result = {locale: state.localeReducer.currentLocale.locale};
  }
  return result;
};

export default connect(mapStateToProps)(TermItem);
