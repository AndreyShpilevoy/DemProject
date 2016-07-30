import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../../actions/forumActions";
import ForumList from "./presentation/ForumList";

class ForumsPage extends React.Component {
    constructor(props, context){
      super(props, context);
    }
    render() {
        const { forums } = this.props;

        return (
            <div>
                <h2>Test ForumsPage</h2>
                <ForumList forums={forums}/>
            </div>
        );
    }
}

ForumsPage.propTypes = {
    forums: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state){//}, ownProps) {
    return {forums: state.forumReducer};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(forumActions, dispatch)
    };
}

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(ForumsPage);
