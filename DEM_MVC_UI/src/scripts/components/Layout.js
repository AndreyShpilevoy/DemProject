import React, {PropTypes} from "react";
import { Header } from "../containers/_all";

const Layout = ({children}) => {
    return (
      <div>
        <Header/>
        {children}
      </div>
    );
  };

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
