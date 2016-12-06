import React, {PropTypes} from 'react';
import TermItem from 'containers/TermItem';
import styles from './index.scss';

class BbCode_Quote extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    options: PropTypes.string
  }

  getAuthorNameFromOption = () => {
    return this.props.options ?
      <div>
        <span className = {styles.quoteAuthor}>
          {this.props.options}
        </span>
        <TermItem spaceBefore term={{id: 32, value: 'wrote:'}} />
      </div> :
      <div>
        <span className = {styles.quoteAuthor}>
          <TermItem term={{id: 33, value: 'Quote:'}} />
        </span>
      </div>;
  }

  render() {
    const { children } = this.props;
    return (
      <blockquote
        className = {styles.quote}>
        {this.getAuthorNameFromOption()}
        {children}
      </blockquote>
  );
  }
}

export default BbCode_Quote;
