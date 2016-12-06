import React, {PropTypes} from 'react';
import styles from './index.scss';

class BbCode_Link extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
    addBreak: PropTypes.bool
  }

  addBreak = () => {
    return this.props.addBreak ?
    <br /> :
    null;
  }

  render() {
    const { url, children } = this.props;
    return (
      <span>
        <a
          className = {styles.link}
          href={url}
          target='_blank'>
          {children}
        </a>
        {this.addBreak()}
      </span>
    );
  }
}

export default BbCode_Link;
