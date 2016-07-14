import React, {PropTypes}  from "react";
import { connect } from "react-redux";
import * as forumAction from "../../actions/forumActions";

class ForumsPage extends React.Component{

  constructor(props, context){
    super(props, context);

    this.state = {
      forum: {
        title: ""
      }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event){
    const forum = this.state.forum;
    forum.title = event.target.value;
    this.setState({forum: forum});
  }

  onClickSave(){
    this.props.dispatch(forumAction.createForum(this.state.forum));
  }

  forumRow(forum, index){
    return <div key={index}>{forum.title}</div>;
  }

  render(){
    return(
      <div>
        <h2>Test ForumsPage</h2>
        {this.props.forums.map(this.forumRow)}
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.forum.title}/>
        <input
          type="submit"
          onClick={this.onClickSave}
          value="Save"/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    forums: state.forumReducer
  };
}

ForumsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  forums: PropTypes.array.isRequired
};

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(ForumsPage);
