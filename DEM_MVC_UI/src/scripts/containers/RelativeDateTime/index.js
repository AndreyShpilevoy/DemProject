import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TransformDateTime from 'services/dateTime/TransformDateTime';
import TextWrapper from 'Atoms/TextWrapper';

class RelativeDateTime extends React.Component {
  static propTypes = {
      relativeDateTime: PropTypes.instanceOf(Date).isRequired,
      locale: PropTypes.string.isRequired,
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
      <TextWrapper
        spanContent={this.transform()}
        className={item.className}
        spaceBefore={item.spaceBefore}
        spaceAfter={item.spaceAfter}/>
    );
  }
}

const mapStateToProps = (state) => {
  let result = {locale:'eng'};
  if(state.localeReducer && state.localeReducer.currentLocale && state.localeReducer.currentLocale.locale){
    result = {locale:state.localeReducer.currentLocale.locale};
  }
  return result;
};

export default connect(mapStateToProps)(RelativeDateTime);
