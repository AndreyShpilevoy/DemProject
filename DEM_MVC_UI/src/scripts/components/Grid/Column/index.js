import React, {PropTypes} from 'react';
import styles from './index.scss';

class Column extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    xs: PropTypes.number,
    xsOffset: PropTypes.number,
    sm: PropTypes.number,
    smOffset: PropTypes.number,
    md: PropTypes.number,
    mdOffset: PropTypes.number,
    lg: PropTypes.number,
    lgOffset: PropTypes.number,
    xl: PropTypes.number,
    xlOffset: PropTypes.number,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: '',
    style: {},
    xs: 0,
    xsOffset: 0,
    sm: 0,
    smOffset: 0,
    md: 0,
    mdOffset: 0,
    lg: 0,
    lgOffset: 0,
    xl: 0,
    xlOffset: 0,
  }

  getColumnWidths = () => {
    const {xs, sm, md, lg, xl} = this.props;
    let colWidths = [];

    // Column widths
    if (xs !== 0) {
      colWidths.push(styles['col-xs-' + xs]);
    }
    if (sm !== 0 && sm !== xs) {
      colWidths.push(styles['col-sm-' + sm]);
    }
    if (md !== 0 && md !== sm) {
      colWidths.push(styles['col-md-' + md]);
    }
    if (lg !== 0 && lg !== md) {
      colWidths.push(styles['col-lg-' + lg]);
    }
    if (xl !== 0 && xl !== lg) {
      colWidths.push(styles['col-xl-' + xl]);
    }

    return colWidths;
  }

  getColumnOffsets = () => {
    const {xsOffset, smOffset, mdOffset, lgOffset, xlOffset} = this.props;
    let offsets = [];

    // Column offsets
    if (xsOffset !== 0) {
      offsets.push(styles['col-xs-offset-' + xsOffset]);
    }
    if (smOffset !== 0 && smOffset !== xsOffset) {
      offsets.push(styles['col-sm-offset-' + smOffset]);
    }
    if (mdOffset !== 0 && mdOffset !== smOffset) {
      offsets.push(styles['col-md-offset-' + mdOffset]);
    }
    if (lgOffset !== 0 && lgOffset !== mdOffset) {
      offsets.push(styles['col-lg-offset-' + lgOffset]);
    }
    if (xlOffset !== 0 && xlOffset !== lgOffset) {
      offsets.push(styles['col-xl-offset-' + xlOffset]);
    }

    return offsets;
  }

  render() {
    let className = [];
    className = className.concat(this.getColumnWidths());
    className = className.concat(this.getColumnOffsets());

    return (
      <div id={this.props.id} className={`${className.join(' ')} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;
