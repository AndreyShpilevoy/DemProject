import React, {PropTypes} from 'react';

class BbCode_UnorderedList extends React.Component {
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
      <ul
        className = {className ? `bbCode-unordered-list ${className}` : 'bbCode-unordered-list'}
        style = {style ? style : null}>
        {children}
      </ul>
    );
  }
}

export default BbCode_UnorderedList;
