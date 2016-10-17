import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import root from "lodash/_root";

class Title extends React.Component {
  static propTypes = {
    mainPart: PropTypes.string.isRequired,
    actionPart: PropTypes.string.isRequired,
    descriptionPart: PropTypes.string.isRequired
  };

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if(nextProps.mainPart !== this.props.mainPart ||
    nextProps.actionPart !== this.props.actionPart ||
    nextProps.descriptionPart !== this.props.descriptionPart){
      let {mainPart, actionPart, descriptionPart} = nextProps;
      let title = mainPart ? mainPart : "";
      title += actionPart ? `${title.length > 0 ? " - " : ""}${actionPart}` : "";
      title += descriptionPart ? `${title.length > 0 ? " - " : ""}${descriptionPart}` : "";
      root.document.title = title;
    }
  }

  render(){
    return null;
  }
}

const mapStateToProps = (state) => {
  if(state.titleReducer){
    let {mainPart, actionPart, descriptionPart} = state.titleReducer;
    return {mainPart, actionPart, descriptionPart};
  }
  return {};
};

export default connect(mapStateToProps)(Title);
