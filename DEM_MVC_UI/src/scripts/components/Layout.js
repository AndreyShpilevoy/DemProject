import React, {PropTypes} from "react";
import { Header, Footer } from "./_all";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render(){
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Layout;
