import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import ChapterItem from "../components/ChapterItem";

class ChapterItemById extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired,
    targetChapterId: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  /* istanbul ignore next */
  componentDidMount() {
    this.props.actions.getChapterById(this.props.targetChapterId);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.targetChapterId !== this.props.targetChapterId) {
      this.props.actions.getChapterById(nextProps.targetChapterId);
    }
  }

  render() {
    return (
      this.props.chapterItem ?
        <div>
          <ChapterItem chapterItem={this.props.chapterItem}/>
        </div> :
        null
    );
  }

}

const mapStateToProps = (state) => {
  let result = {};
  if(state.chapterReducer && state.chapterReducer.chapterById){
    result = {chapterItem: state.chapterReducer.chapterById};
  }
  if(state.localeReducer &&
    state.localeReducer.currentLocale &&
    state.localeReducer.currentLocale.locale){
    result = Object.assign({}, result, {locale: state.localeReducer.currentLocale.locale});
  }
  return result;
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(chapterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterItemById);
