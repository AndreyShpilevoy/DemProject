import React, {PropTypes} from 'react';
import styles from './index.scss';

class Container extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    fluid: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  state = {
    componentClassName: this.props.fluid ? styles.containerFluid : styles.container,
  }

  render() {
    return (
      <div id={this.props.id} className={`${this.state.componentClassName} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
