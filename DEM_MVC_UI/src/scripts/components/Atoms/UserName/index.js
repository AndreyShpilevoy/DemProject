import React, {PropTypes} from 'react';
import { Link } from 'react-router';

class UserName extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    className: '',
    style: {}
  }

  getStyles = () => {
    let {style, color} = this.props;
    return Object.assign({}, style, color ? {color} : {});
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
