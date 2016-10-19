import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as breadcrumbsActions from "../actions/breadcrumbsActions";
import Breadcrumbs from "../containers/Breadcrumbs";
//import TopicArray from '../containers/TopicArray';

class ViewTopicPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      topicId: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getTopicBreadcrumbs(this.props.params.topicId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    let topicId = nextProps.params.topicId;
    if (topicId !== this.props.params.topicId) {
      this.props.actions.getTopicBreadcrumbs(topicId);
    }
  }

  render() {
    return (
      <div>
        <Breadcrumbs/>
        View Topic Page {this.props.params.topicId}
        <Breadcrumbs/>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...breadcrumbsActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewTopicPage);
