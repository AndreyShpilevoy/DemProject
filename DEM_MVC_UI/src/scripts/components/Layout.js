import React, {PropTypes} from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import NotificationCreator from "containers/NotificationCreator";
import Title from "containers/Title";

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
