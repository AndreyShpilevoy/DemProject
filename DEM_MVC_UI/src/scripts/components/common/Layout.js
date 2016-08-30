import React, {PropTypes} from "react";
import Header from "../common/presentation/Header";

class Layout  extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render(){
    let navigationLinks = [
      {id:"navigationLinks-1", content:'Forums',link:'/'},
      {id:"navigationLinks-2", content:'Topics',link:'/topics'},
      {id:"navigationLinks-3", content:'Link 3 autogen',link:'/'}
    ];

    return (
      <div>
        <Header navigationLinks = {navigationLinks} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
