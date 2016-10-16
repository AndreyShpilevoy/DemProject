import React, {PropTypes} from 'react';
//import TopicArray from '../containers/TopicArray';

class ViewTopicPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      topicId: PropTypes.number.isRequired
    }).isRequired
  };
  render() {
      return (
        <div>
          View Topic Page {this.props.params.topicId}
        </div>
      );
    // return (
    //   <div>
    //     <TopicArray forumId={this.props.params.forumId}/>
    //   </div>
    // );
  }
}

export default ViewTopicPage;
