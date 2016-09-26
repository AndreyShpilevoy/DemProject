import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {TransformDateTime} from "../utils/_all";
import {RelativeDateTime as RelativeDateTimeComponent} from "../components/_all";

class RelativeDateTime extends React.Component {
  static propTypes = {
      relativeDateTime: PropTypes.instanceOf(Date).isRequired,
      locale: PropTypes.object.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  transform = () => {
      if(this.props.relativeDateTime && this.props.locale){
        return TransformDateTime.GetRelative(this.props.relativeDateTime, this.props.locale);
      } else {
        return null;
      }
  }

  render(){
    let item = this.props;
    return(
      <RelativeDateTimeComponent
        relativeDateTime={this.transform()}
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

export default connect(mapStateToProps)(RelativeDateTime);
