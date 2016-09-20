import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as localeActions from "../actions/localeActions";
import {TermItem as TermItemComponent} from "../components/_all.js";
import {TermTranslation} from "../reactLess/_all.js";

class TermItem extends React.Component {
  static propTypes = {
      term: PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
      locale: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.getLocale();
  }

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
      <TermItemComponent term={this.translate()} className={item.className} spaceBefore={item.spaceBefore} spaceAfter={item.spaceAfter}/>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.localeReducer.locale
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(localeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TermItem);
