import React, {PropTypes} from 'react';
import styles from './index.scss';

class Hidden extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    xs: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  getHiddenStyles = () => {
    const {xs, sm, md, lg, xl} = this.props;
    let colWidths = [];

    // Column widths
    if (xs && (xs.toLowerCase() === 'down' || xs.toLowerCase() === 'up')) {
      colWidths.push(styles[`hidden-xs-${xs}`]);
    }
    if (sm && (sm.toLowerCase() === 'down' || sm.toLowerCase() === 'up')) {
      colWidths.push(styles[`hidden-sm-${sm}`]);
    }
    if (md && (md.toLowerCase() === 'down' || md.toLowerCase() === 'up')) {
      colWidths.push(styles[`hidden-md-${md}`]);
    }
    if (lg && (lg.toLowerCase() === 'down' || lg.toLowerCase() === 'up')) {
      colWidths.push(styles[`hidden-lg-${lg}`]);
    }
    if (xl && (xl.toLowerCase() === 'down' || xl.toLowerCase() === 'up')) {
      colWidths.push(styles[`hidden-xl-${xl}`]);
    }

    return colWidths;
  }

  render() {
    let className = [];
    className = className.concat(this.getHiddenStyles());

    return (
      <div id={this.props.id} className={`${className.join(' ')} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Hidden;
