import React, {PropTypes} from 'react';

class BbCode_Paragraph extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return (
      <p
        className = 'bbCode-paragraph'>
        {children}
      </p>
    );
  }
}

export default BbCode_Paragraph;
