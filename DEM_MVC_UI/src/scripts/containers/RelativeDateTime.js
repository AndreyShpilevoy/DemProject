//Context ussed here!
import React, {PropTypes} from 'react';
import {TransformDateTime, ReduxContextFix} from "../utils/_all";

class RelativeDateTime extends React.Component {
  static propTypes = {
      dateTime: PropTypes.instanceOf(Date)
  };

  static contextTypes = {
    locale: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    ReduxContextFix.connect(this);
  }

  transform = () => {
      if(this.props.dateTime && this.context.locale){
        return TransformDateTime.GetRelative(this.props.dateTime, this.context.locale);
      } else {
        return null;
      }
  }

  render(){
    return(
      <span>{this.transform()}</span>
    );
  }
}

export default RelativeDateTime;
