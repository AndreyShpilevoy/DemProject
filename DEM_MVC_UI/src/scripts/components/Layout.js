import React, {PropTypes} from "react";
import { Header, Footer } from "./_all";
import { NotificationCreator } from "../containers/_all";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render(){
    return (
      <div>
        <Header/>
          <div className="page-content">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 width-100-percent">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        <Footer/>
        <NotificationCreator/>
      </div>
    );
  }
}

export default Layout;
