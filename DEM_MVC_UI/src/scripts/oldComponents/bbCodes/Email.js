import React, {PropTypes} from 'react';

class Email extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    addBreak: PropTypes.bool
  }

  addBreak = () => {
    return this.props.addBreak ?
    <br /> :
    null;
  }

  render() {
    const { email } = this.props;
    return (
      <span>
        <a
          className = 'bbCode-email'
          href={`mailto:${email}`}
          rel='nofollow'>
          {email}
        </a>
        {this.addBreak()}
      </span>
    );
  }
}

export default Email;
