import React, {PropTypes} from 'react';

class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    attributes: PropTypes.shape({
      className: PropTypes.string,
      style: PropTypes.object,
    })
  }
  render() {
    const { children } = this.props;
    const { className, style } = this.props.attributes;
    return (
      <li 
        className = {className ? `bbCode-list-item ${className}` : "bbCode-list-item"}
        style = {style ? style : null}>
        {children}
      </li>
    );
  }
}

export default ListItem;
