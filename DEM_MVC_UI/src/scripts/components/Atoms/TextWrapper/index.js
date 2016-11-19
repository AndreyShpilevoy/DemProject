import React, {PropTypes} from 'react';
import styles from './index.scss';

class TextWrapper extends React.Component {
  static propTypes = {
      spanContent: PropTypes.string.isRequired,
      className: PropTypes.string,
      spaceBefore: PropTypes.bool,
      spaceAfter: PropTypes.bool,
  };

  getClassName = () => {
    let {className, spaceBefore, spaceAfter} = this.props;
    return `${className} ${spaceBefore ? styles.spaceBefore : null} ${spaceAfter ? styles.spaceAfter : null}`;
  };

  render(){
    return this.props.spanContent ?
      <span className={this.getClassName()}>
        {this.props.spanContent}
      </span> :
      null;
  }
}

export default TextWrapper;
