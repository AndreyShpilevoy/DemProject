import React, {PropTypes} from 'react';

class BbCode_Image extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    addBreak: PropTypes.bool
  }

  addBreak = () => {
    return this.props.addBreak ?
    <br /> :
    null;
  }

  render() {
    const { url } = this.props;
    return (
      <span>
        <img
          alt={url}
          className = 'bbCode-image'
          src={url} />
        {this.addBreak()}
      </span>
    );
  }
}

export default BbCode_Image;
