import React, {PropTypes} from 'react';
import styles from './index.scss';

class Row extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    reverse : PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  state = {
    componentClassName: this.props.reverse  ? `${styles.row} ${styles.reverse}` : styles.row,
  }

  render() {
    return (
      <div id={this.props.id} className={`${this.state.componentClassName} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;
