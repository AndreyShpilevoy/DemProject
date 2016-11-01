import React, {PropTypes} from 'react';

class Quote extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    options: PropTypes.string
  }

  getAuthorNameFromOption = () => {
    return this.props.options ?
      <div className = "bbCode-code-author">
        this.props.options
      </div> :
      null;
  }
  
  render() {
    const { children } = this.props;
    return (
      <blockquote
        className = "bbCode-quote">
        {this.getAuthorNameFromOption()}
        {children}
      </blockquote>
  );
  }
}

export default Quote;
