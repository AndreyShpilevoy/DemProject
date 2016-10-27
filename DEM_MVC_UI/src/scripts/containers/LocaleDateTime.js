import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import TransformDateTime from "utils/TransformDateTime";
import SpanWrapper from "components/SpanWrapper";

class LocaleDateTime extends React.Component {
  static propTypes = {
      localeDateTime: PropTypes.instanceOf(Date).isRequired,
      locale: PropTypes.object.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  }

  transform = () => {
      if(this.props.localeDateTime && this.props.locale){
        return TransformDateTime.GetLocaleDateTime(this.props.localeDateTime, this.props.locale, this.state.options);
      } else {
        return null;
      }
  }

  render(){
    let item = this.props;
    return(
      <SpanWrapper
        spanContent={this.transform()}
        className={item.className}
        spaceBefore={item.spaceBefore}
        spaceAfter={item.spaceAfter}/>
    );
  }
}

const mapStateToProps = (state) => {
  let result = {};
  if(state.localeReducer &&
    state.localeReducer.currentLocale &&
    state.localeReducer.currentLocale.locale){
    result = {locale: state.localeReducer.currentLocale.locale};
  }
  return result;
};

export default connect(mapStateToProps)(LocaleDateTime);
