import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import SpanWrapper from "components/SpanWrapper";
import TermTranslation from "services/translations/TermTranslation";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
      locale: PropTypes.string.isRequired
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
      <SpanWrapper
        spanContent={this.translate()}
        className={item.className}
        spaceBefore={item.spaceBefore}
        spaceAfter={item.spaceAfter}/>
    );
  }
}


const mapStateToProps = (state) => {
  return (state.localeReducer && state.localeReducer.currentLocale) ? state.localeReducer.currentLocale : {locale:"eng"};
};

export default connect(mapStateToProps)(TermItem);
