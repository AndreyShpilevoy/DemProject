import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class UserName extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  getStyles = () => {
    return Object.assign({}, this.props.style, {color: this.props.color});
  };

  render(){
    let {name, className} = this.props;
    return(
      <Link className={className} activeStyle={this.getStyles()} to={'/'}>
        {name}
      </Link>
    );
  }
}

export default UserName;
