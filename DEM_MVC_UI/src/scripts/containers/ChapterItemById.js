import React, {PropTypes} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chapterActions from "../actions/chapterActions";
import * as titleActions from "../actions/titleActions";
import ChapterItem from "../components/ChapterItem";
import TermTranslation from "../utils/TermTranslation";

class ChapterItemById extends React.Component {
  static propTypes = {
    chapterItem: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
    }).isRequired,
    targetChapterId: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
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

    if(nextProps.locale){
      let titleActionPart = TermTranslation.getTermTranslation({id: 28, value: "View Forum"}, nextProps.locale);
      this.props.actions.setTitleActionPart(titleActionPart);
    }

    if(nextProps.chapterItem && nextProps.chapterItem.title){
      this.props.actions.setTitleDescriptionPart(nextProps.chapterItem.title);
    }
  }

  /* istanbul ignore next */
  componentWillUnmount(){
    this.props.actions.setTitleActionPart();
    this.props.actions.setTitleDescriptionPart();
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
  actions: bindActionCreators({...chapterActions, ...titleActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterItemById);
