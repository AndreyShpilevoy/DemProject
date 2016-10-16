import React, {PropTypes} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Title from "../containers/Title";
import NotificationCreator from "../containers/NotificationCreator";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render(){
    return (
      <div>
        <Title/>
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
