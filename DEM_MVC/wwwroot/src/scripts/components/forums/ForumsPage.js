import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumActions from "../../actions/forumActions";

class ForumsPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    forumRow(forum, index) {
        return <div key={index}>{forum.title}</div>;
    }

    render() {
        return (
            <div>
                <h2>Test ForumsPage</h2>
                {this.props.forums.map(this.forumRow)}
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
