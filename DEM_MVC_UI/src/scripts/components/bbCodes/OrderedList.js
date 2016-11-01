import React, {PropTypes} from 'react';

class OrderedList extends React.Component {
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
      <ol
        className = {className ? `bbCode-ordered-list ${className}` : "bbCode-ordered-list"}
        style = {style ? style : null}>
        {children}
      </ol>
    );
  }
}

export default OrderedList;
