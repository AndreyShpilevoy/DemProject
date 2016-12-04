import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';

class Quote extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    options: PropTypes.string
  }

  getAuthorNameFromOption = () => {
    return this.props.options ?
      <div>
        <span className = 'bbCode-quote-author'>
          {this.props.options}
        </span>
        <TermItem spaceBefore term={{id: 32, value: 'wrote:'}} />
      </div> :
      <div>
        <span className = 'bbCode-quote-author'>
          <TermItem term={{id: 33, value: 'Quote:'}} />
        </span>
      </div>;
  }

  render() {
    const { children } = this.props;
    return (
      <blockquote
        className = 'bbCode-quote'>
        {this.getAuthorNameFromOption()}
        {children}
      </blockquote>
  );
  }
}

export default Quote;
